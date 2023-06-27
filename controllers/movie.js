const Movie = require('../models/movie');
const http2 = require('http2');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const ForbiddenError = require('../errors/forbidden');



const createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN
  } = req.body;
  Movie.create({
    country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN
  })
    .then((newMovie) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
};