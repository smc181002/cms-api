const { Router } = require('express');
const bookController = require('../controllers/bookControllers.js');
const { isLibrarian } = require('../middleware/accessMiddleware.js');
const router = Router();

router.get("/listBooks", bookController.listBooks);
router.post("/addNewBook/", isLibrarian, bookController.addNewBook);
router.delete("/deleteBook/:id", bookController.deleteBook);
// router.get("/listBooks/ebooks", bookController.listEBooks);
// router.get("/listBooks/ebooks", bookController.listHardCopyBooks);

module.exports = router;
