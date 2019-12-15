const router = require('express').Router();
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const NotFoundError = require('../errors/not-found-err');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
