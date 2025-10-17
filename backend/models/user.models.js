const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, 
    phoneno: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
})

  const user = mongoose.model('user', userSchema);


  module.exports = user;