const {User} = require('../models');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3days
const createToken = (id) => {
  return jwt.sign({ id }, 'itlab secret', {
    expiresIn: maxAge
  });
};

module.exports.addUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.create({userId, email, password, role,});
    const token = createToken(user._id);

    // maxAge is in milliseconds
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'None', secure: true});

    // new resource created status code
    res.status(201).json({user: user._id});
  } catch (err) {
    let errors = handleErrors(err);
    // bad request status code
    res.status(400).json({ errors });
  }
}
