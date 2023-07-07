const moviesRouter = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');
const {
  movieValidator, deleteMovieValidator,
} = require('../middlewares/requestvalidator');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValidator(), createMovie);
moviesRouter.delete('/:id', deleteMovieValidator(), deleteMovie);

module.exports = moviesRouter;
