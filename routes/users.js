const usersRouter = require('express').Router();
const {
  findUser, usersArr, createUser,
  updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', usersArr);
usersRouter.get('/:id', findUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);


module.exports = usersRouter;
