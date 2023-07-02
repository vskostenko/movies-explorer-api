const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movie');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not_found');
const { validateSignup, validateSignin } = require('../middlewares/requestvalidator');

router.use('/signup', validateSignup(), createUser);
router.use('/signin', validateSignin(), login);
router.use('/users',auth, usersRouter);
router.use('/movies',auth, moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

module.exports = router;
