const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'ebook',
      'book',
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
  coverPic: {
    type: String,
  },
});

bookSchema.plugin(mongoosePaginate);
const Book = mongoose.model('book', bookSchema);

module.exports = Book;
