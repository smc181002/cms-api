const { Router } = require('express');
const { adminController } = require('../controllers');
const router = Router();

router.post("/addUser/", adminController.addUser);

module.exports = router;
