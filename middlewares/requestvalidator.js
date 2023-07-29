const { celebrate, Joi } = require('celebrate');

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const linkImageRegExp = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i;

const validateSignin = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignup = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const movieValidator = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkImageRegExp),
    thumbnail: Joi.string().required().regex(linkImageRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = () => celebrate({
  params: Joi.object({
    id: Joi.string().required().length(24).hex(),
  }),
});

const updateUserValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  movieValidator,
  deleteMovieValidator,
  updateUserValidator,
};
