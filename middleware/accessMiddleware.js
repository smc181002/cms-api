let jwt = require('jsonwebtoken');

let User = require('../models/User');

const verifyUserRoleAccess = (req, res, next, role, errorMsg) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'itlab secret', async (err, tokenDecoded) => {
      if (err) {
        console.log(err.message);
        res.status(403).json({loggedIn: false});
      } else {
        let user = await User.findById(tokenDecoded.id)
        if(!role.includes(user.role)) {
          res.status(403).json(errorMsg);
        } else {
          console.log(tokenDecoded);
          next();
        }
      }
    });
  } else {
    console.log('stes');
    res.status(403).json({loggedIn: false});
  }
}

module.exports.isAdmin = (req, res, next) => {
  verifyUserRoleAccess(req, res, next, ['admin'], {error: "Access Denied. User not Admin"})
}

module.exports.isLibrarian = (req, res, next) => {
  verifyUserRoleAccess(req, res, next, ['admin', 'librarian'], {error: "Access Denied. User not Admin or Librarian"})
}

module.exports.isFaculty = (req, res, next) => {
  verifyUserRoleAccess(req, res, next, ['admin', 'faculty'], {error: "Access Denied. User not Admin or Librarian"})
}

module.exports.isStudentOnly = (req, res, next) => {
  verifyUserRoleAccess(req, res, next, ['student'], {error: "Access Denied. User not Student"})
}
