const http2 = require('http2');
const User = require('../models/user');
const NotFoundError = require('../errors/not_found');
const BadRequestError = require('../errors/bad_request');
const ConflictError = require('../errors/conflict');
const bcrypt = require('bcrypt');


const createUser = (req, res, next) => {
  console.log(req.body);
  const {
    email, password, name
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password, name,
    }))
    .then((newUser) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с этим электронным адресом уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const { NODE_ENV, SECRET_KEY } = process.env;
        // создадим токен
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
          { expiresIn: '7d' },
        );
        // вернём токен
        return res.send({ token });
      }
      return next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  login,
};
