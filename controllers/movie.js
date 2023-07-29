const http2 = require('http2');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const ForbiddenError = require('../errors/forbidden');

const createMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.create({ ...req.body, owner: userId })
    .then((newMovie) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Movie.findByIdAndDelete(id)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Фильм по указанному Id не найдена');
      if (userId !== movie.owner._id.toString()) throw new ForbiddenError('Недостаточно прав для удаления фильма');
      return movie.deleteOne();
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
