const userIdRouter = require('express').Router();
const users = require('../data/users.json');

userIdRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(currUser => {
    return currUser._id === id;
  });
  if(user) {
    res.send(user);
  } else {
    res.send({ "message": "Нет пользователя с таким id" });
  }
});

module.exports = userIdRouter;