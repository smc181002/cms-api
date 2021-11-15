const { Router } = require('express');
const onlineTutsController = require('../controllers/onlineTutsController.js');
const { isLibrarian } = require('../middleware/accessMiddleware.js');
const { checkUser } = require('../middleware/authMiddleware.js');
const router = Router();

router.get("/listPages", onlineTutsController.listPages);
router.get("/listPage/:id", onlineTutsController.listPage);
router.post("/addNewPage/", checkUser, isLibrarian, onlineTutsController.addNewPage);
// router.put("/addNewPage/:id", bookController.addNewPage);
// router.delete("/deletePage/:id", bookController.deletePage);

module.exports = router;
