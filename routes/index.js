const router = require('express').Router();
const usersRouter = require('./users');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not_found');
const { validateSignup, validateSignin } = require('../middlewares/requestvalidator');

router.use('/signup',validateSignup(), createUser);
router.use('/signin',validateSignin(), login);
//router.use('/signin', validateSignin(), login);
router.use('/users', usersRouter);
//router.use('/movies', moviesRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

module.exports = router;
