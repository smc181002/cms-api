const Book = require('../models/Book');

module.exports.addNewBook = async (req, res) => {
  const { title, author, type, publication, coverPic } = req.body;

  try {
    const book = await Book.create({ title, author, type, publication, coverPic });

    // new resource created status code
    res.status(201).json({status: "book added", book});
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}

module.exports.listBooks = async (req, res) => {
  try {
    const books = await Book.paginate({}, {limit: 1, page: req.query.page || 1});
    res.status(200).json(books);
  } catch(err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}
