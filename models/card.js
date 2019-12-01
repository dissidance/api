const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?(((\d{1,3}\.){3}\d{1,3})|((\w+)((-\w+)+)?\.\w{2,}))((\.\w{2,4})+)?(:\d{2,5})?((\/+\w+(-\w+)?)+#?)?(\w+\.\w+)?$/.test(v);
      },
      message: (props) => `${props.value} не является ссылкой`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
