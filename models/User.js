const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Teacher', 'Student'],
    required: true
  },
  name: {
    type: String
    // required: true
  },
  image: {
    imgName: String,
    imgPath: String,
    publicId: String
  },
  description: String,
  githubId: String
})

const User = model('User', userSchema);

module.exports = User;