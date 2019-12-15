const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  findUser, usersArr,
  updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', usersArr);

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required(),
  }),
}), findUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);


module.exports = usersRouter;
