const moviesRouter = require('express').Router();

const {
  getMovies, createMovie
  } = require('../controllers/movie');
const {
  } = require('../middlewares/requestvalidator');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);

module.exports = moviesRouter;
