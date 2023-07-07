const usersRouter = require('express').Router();

const { getUserProfile, updateUserProfile } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/requestvalidator');

usersRouter.get('/me', getUserProfile);
usersRouter.patch('/me', updateUserValidator(), updateUserProfile);

module.exports = usersRouter;
