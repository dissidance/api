const cards = require('../data/cards.json');

const getCardsArr = (req, res) => {
  res.send(cards);
};

module.exports = getCardsArr;
