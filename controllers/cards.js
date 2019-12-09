const Card = require('../models/card');

module.exports.cardsArr = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе списка карточек' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при создании карточки' }));
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
      }
      if (card.owner.toString() === req.user._id) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(403).send({ message: 'Недостаточно прав' });
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        return;
      }
      res.status(500).send({ message: err });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
      }
      if (card.owner.toString() === req.user._id) {
        res.send(card);
      } else {
        res.status(403).send({ message: 'Недостаточно прав' });
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при отправке данных' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
      }
      if (card.owner.toString() === req.user._id) {
        res.send(card);
      } else {
        res.status(403).send({ message: 'Недостаточно прав' });
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка при отправке данных' });
    });
};
