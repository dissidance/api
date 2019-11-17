const users = require('../data/users.json');

const getUsersArr = (req, res) => {
  res.send(users);
};

module.exports = getUsersArr;
