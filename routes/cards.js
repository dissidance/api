const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  cardsArr, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', cardsArr);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), removeCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
