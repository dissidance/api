const jwt = require('jsonwebtoken');
const { key } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, key);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
};
