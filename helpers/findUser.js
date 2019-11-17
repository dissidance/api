const users = require('../data/users.json');

const findUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((currUser) => currUser._id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
};

module.exports = findUser;
