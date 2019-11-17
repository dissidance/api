const cardsRouter = require('express').Router();
const getCardsArr = require('../helpers/getCardsArr');

cardsRouter.get('/', getCardsArr);

module.exports = cardsRouter;
