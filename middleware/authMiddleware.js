const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'itlab secret', (err, tokenDecoded) => {
      if (err) {
        console.log(err.message);
        res.status(403).json({loggedIn: false});
      } else {
        console.log(tokenDecoded);
        next();
      }
    });
  } else {
    res.status(403).json({loggedIn: false});
  }
}

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, 'itlab secret', async (err, tokenDecoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(tokenDecoded.id)
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}


