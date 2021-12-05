const {User} = require('../models');

module.exports.addUser = async (req, res) => {
  const {name, email, password, role} = req.body;

  try {
    const user = await User.create({name, email, password, role});
    res.status(201).json({id: user._id, name: user.name, email: user.email, role: user.role});
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.listUsers = async (req, res) => {
  // const {name, email, password, role} = req.body;

  try {
    // const users = await User.paginate({}, );
    const users = await User.paginate({}, {limit: 5, page: req.query.page || 1, projection: {email: true, name: true, tutorials: true, role: true}});
    res.status(200).json(users);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.listRequests = async (req, res) => {
  // const {name, email, password, role} = req.body;

  try {
    // const users = await User.paginate({}, );
    const users = await User.paginate({hostelRoom: {$exists: false}, role: "student"}, {limit: 5, page: req.query.page || 1, projection: {email: true, name: true, tutorials: true, role: true}});
    res.status(200).json(users);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}
