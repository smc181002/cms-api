const User = require('../models/User');

module.exports.getUserName = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    res.status(200).json({user: user.email});
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}
