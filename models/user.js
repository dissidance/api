const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?(((\d{1,3}\.){3}\d{1,3})|((\w+)((-\w+)+)?\.\w{2,}))((\.\w{2,4})+)?(:\d{2,5})?((\/+\w+(-\w+)?)+#?)?(\w+\.\w+)?$/.test(v);
      },
      message: (props) => `${props.value} не является ссылкой`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
