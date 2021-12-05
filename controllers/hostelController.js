const {User, HostelRoom} = require('../models');

module.exports.myHostel = async (req, res) => {
  try {
    let userid = res.locals.user._id;
    // if (req.params.id) userid = req.params.id
    const user = await User.findById(userid, {password: false, tutorials: false}).populate('hostelRoom')
    res.status(200).json(user);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.listRequests = async (req, res) => {
  try {
    const users = await User.paginate({hostelRoom: {$exists: false}, role: "student"}, {limit: 5, page: req.query.page || 1, projection: {email: true, name: true, tutorials: true, role: true}});
    // const users = await User.paginate({role: "student"}, {limit: 5, page: req.query.page || 1, populate: 'hostelRoom'});
    res.status(200).json(users);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.listRooms = async (req, res) => {
  try {
    // const users = await User.paginate({hostelRoom: {$exists: false}, role: "student"}, {limit: 5, page: req.query.page || 1, projection: {email: true, name: true, tutorials: true, role: true}});
    const hostelRooms = await HostelRoom.paginate({}, {limit: 5, page: req.query.page || 1, populate: {path: 'students', select: ['name', 'email']}})
    res.status(200).json(hostelRooms);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.addRoom = async (req, res) => {
  const {roomNo, block} = req.body;

  try {
    const hostelRooms = await HostelRoom.create({roomNo, block})
    res.status(200).json(hostelRooms);
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}

module.exports.allocateRoom = async (req, res) => {
  const {userid} = req.body;

  try {
    let user = await User.findById(userid).populate('hostelRoom');

    // console.log(Boolean(user.hostelRoom !== ""))
    if (user.hostelRoom !== "" && user.hostelRoom !== undefined) {
      res.status(400).json({error: 'user already has hostel allocated'})
    } else {
      const hostelRoom = await HostelRoom.findOneAndUpdate({$where: "this.students.length < 2"}, {$push: {students: userid}}, {new: true})
      await User.findByIdAndUpdate({_id: userid}, {$set: {hostelRoom: hostelRoom._id}}, {new: true})
      
      res.status(200).json(hostelRoom);
    }
  } catch (err) {
    // let errors = handleErrors(err);
    let errors = {error: "error occured"}
    // bad request status code
    console.log(err)
    res.status(400).json({ errors });
  }
}
