const User = require('../models/user');

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.usersArr = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе списка пользователей' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании пользователя' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      res.send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Данные не прошли валидацию' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Пользователя с таким id не существует' });
        return;
      }
      res.status(500).send({ message: 'Данные не прошли валидацию' });
    });
};
