const usersRouter = require('express').Router();
const findUser = require('../helpers/findUser.js');
const getUsersArr = require('../helpers/getUsersArr');

usersRouter.get('/', getUsersArr);
usersRouter.get('/:id', findUser);

module.exports = usersRouter;
