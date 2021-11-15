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
    // TODO: get content for the current user
    if (req.query.user == "current") {
      tutorials = await Tutorial.paginate({userid: res.locals.user._id}, {limit: 5, page: req.query.page || 1});
    } else {
      tutorials = await Tutorial.paginate({limit: 5, page: req.query.page || 1});

      // tutorials.docs = tutorials.docs.map(async (tutorial) => {
        // let user = await User.findById(tutorial.userid)
        // let email = user.email
        // return {...tutorial, email}
      // })
//
      // console.log(tutorials.docs)

      // console.log(tutorials.docs[0]['userid.email'])
    }
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
    let tutorials = await Tutorial.findById(req.params.id)
    console.log(tutorials);
    res.status(200).json({...tutorials, });
  } catch (err) {
    // bad request status code
    console.log(err);
    res.status(400).json({ error: "error occured" });
  }
}
