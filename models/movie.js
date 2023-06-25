const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://www.wolflair.com/wp-content/uploads/2017/02/placeholder.jpg',
    validate: /^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/,
  },
  trailerLink: {
    type: String,
    default: 'https://www.wolflair.com/wp-content/uploads/2017/02/placeholder.jpg',
    validate: /^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/,
  },
  thumbnail: {
    type: String,
    default: 'https://www.wolflair.com/wp-content/uploads/2017/02/placeholder.jpg',
    validate: /^(http|https):\/\/(www\.)?[a-zA-Z0-9\S)]#?/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);