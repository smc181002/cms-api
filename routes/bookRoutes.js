const { Router } = require('express');
const bookController = require('../controllers/bookControllers.js');
const { isLibrarian } = require('../middleware/accessMiddleware.js');
const router = Router();

router.post("/addNewBook/", isLibrarian, bookController.addNewBook);
router.get("/listBooks", bookController.listBooks);
// router.get("/listBooks/ebooks", bookController.listEBooks);
// router.get("/listBooks/ebooks", bookController.listHardCopyBooks);

module.exports = router;
