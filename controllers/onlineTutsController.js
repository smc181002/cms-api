const jwt = require('jsonwebtoken');
const Tutorial = require('../models/Tutorial');
const User = require('../models/User');

module.exports.addNewPage = async (req, res) => {
  const { title, data } = req.body;
  let userid;
  try {
    userid = res.locals.user._id;
    const tutorial = await Tutorial.create({ userid, title, data });

    // new resource created status code
    res.status(201).json({status: "tutorial added", tutorial});
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}

module.exports.listPages = async (req, res) => {
  try {
    let tutorials;
    tutorials = await Tutorial.paginate({}, {populate: {path: 'userid', select: ['email']}, lean: true, limit: 5, page: req.query.page || 1});

    res.status(200).json(tutorials);
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}

module.exports.listPage = async (req, res) => {
  try {
    // new resource created status code
    let tutorials = await Tutorial.findById(req.params.id).populate({path: 'userid', select: 'email'})
    console.log(tutorials);
    res.status(200).json(tutorials);
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}
