const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const AccessError = require('../errors/access-error');
const NotFoundError = require('../errors/not-found-err');

module.exports.cardsArr = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => next(new BadRequestError('Данные не прошли валидацию')));
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          Card.findByIdAndRemove(req.params.cardId)
            .then(() => res.send({ message: 'Карточка удалена' }))
            .catch((err) => res.status(404).send({ message: err.message }));
        } else {
          throw new AccessError('Недостаточно прав');
        }
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new NotFoundError('Карточки с таким id не существует'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.toString() === req.user._id) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new NotFoundError('Карточки с таким id не существует'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.toString() === req.user._id) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        next(new NotFoundError('Карточки с таким id не существует'));
      }
    });
};
