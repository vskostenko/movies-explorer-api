const moviesRouter = require('express').Router();

const {
} = require('../controllers/movie');
const {
} = require('../middlewares/requestvalidator');

moviesRouter.get('/', getMovie);
moviesRouter.post('/', createMovie);

module.exports = moviesRouter;
