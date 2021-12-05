const { Router } = require('express');
const hostelController = require('../controllers/hostelController.js');
const { isStudentOnly } = require('../middleware/accessMiddleware.js');
const { checkUser } = require('../middleware/authMiddleware.js');
const router = Router();

router.get("/myHostel", checkUser, isStudentOnly, hostelController.myHostel);
// router.get("/myHostel", hostelController.myHostel);

module.exports = router;
