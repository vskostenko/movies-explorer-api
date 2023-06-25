const usersRouter = require('express').Router();

const { getUserProfile, updateUserProfile
} = require('../controllers/users');
//const {
//  validateGetUserById, validateUpdateProfile, validateUpdateAvatar,
//} = require('../middlewares/requestvalidator');

usersRouter.get('/me', getUserProfile);
usersRouter.patch('/me', updateUserProfile);

module.exports = usersRouter;
