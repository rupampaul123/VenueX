const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  phoneno: {
    type: Number,
    required: function () {
      return !this.googleId;
    },
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const user = mongoose.model('user', userSchema);

module.exports = user;
