const { Router } = require('express');
const miscController = require('../controllers/miscController.js');
// const { isLibrarian } = require('../middleware/accessMiddleware.js');
// const { checkUser } = require('../middleware/authMiddleware.js');
const router = Router();

router.get("/getUserName/:id", miscController.getUserName);

module.exports = router;
