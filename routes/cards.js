const cardsRouter = require('express').Router();
const {
  cardsArr, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', cardsArr);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', removeCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
