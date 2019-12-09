const usersRouter = require('express').Router();
const {
  findUser, usersArr,
  updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', usersArr);
usersRouter.get('/:id', findUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);


module.exports = usersRouter;
