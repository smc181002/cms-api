const {User} = require('../models');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = {email: "", password: "", summary: ""};

  if (err.code === 1100) {
    errors.email = errors.summary = "The email already exists";
    return errors;
  }

  if (err.message === 'incorrect email') 
    errors.email = "Email is not existing"

  if (err.message === 'incorrect password')
    errors.email = "Password is incorrect"

  errors.summary = "invalid email or password wrong"
}


const maxAge = 3 * 24 * 60 * 60; // 3days
const createToken = (id) => {
  return jwt.sign({ id }, 'itlab secret', {
    expiresIn: maxAge
  });
};


module.exports.signup = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
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

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, sameSite: 'None', secure: true});
    res.cookie('user', `${user.name}-${user.role}`, { maxAge: maxAge * 1000, sameSite: 'None', secure: true});
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    // bad request status code
    console.log(req.body);
    console.log(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout = (_, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.cookie('user', '', {maxAge: 1});
  res.status(200).json({loggedOut: true})
}
