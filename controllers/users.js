const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { key } = require('../config');
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
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .json({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.usersArr = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе списка пользователей' }));
};

module.exports.createUser = async (req, res) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    res.status(401).send({ message: 'Такой пользователь уже существует' });
    return;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }, { runValidators: true }))
    .then((user) => res.send(user.public))
    .catch(() => res.status(500).send({ message: 'Данные не прошли валидацию' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      res.send(user.public);
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
        res.send(user.public);
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
