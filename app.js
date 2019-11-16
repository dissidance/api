const express = require('express');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const userIdRouter = require('./routes/user_id.js')

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/users', userIdRouter);
app.use('/', (req,res) => {
  res.send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`)
});