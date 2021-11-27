const {User} = require('../models');

module.exports.addUser = async (req, res) => {
  const {name, email, password, role} = req.body;

  try {
    const user = await User.create({name, email, password, role});
    res.status(201).json({id: user._id, name: user.name, email: user.email, role: user.role});
  } catch (err) {
    let errors = handleErrors(err);
    // bad request status code
    res.status(400).json({ errors });
  }
}
