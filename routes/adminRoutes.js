const { Router } = require('express');
const { adminController, hostelController } = require('../controllers');
const { isAdmin } = require('../middleware/accessMiddleware.js');
// const { checkUser } = require('../middleware/authMiddleware.js');
const router = Router();

router.post("/addUser/", isAdmin, adminController.addUser);
router.get("/listUsers/", isAdmin, adminController.listUsers);
router.get("/hostel/listRooms/", isAdmin, hostelController.listRooms);
router.get("/hostel/listRequests/", isAdmin, hostelController.listRequests);
router.post("/hostel/addRoom/", isAdmin, hostelController.addRoom);
router.post("/hostel/allocateRoom/", isAdmin, hostelController.allocateRoom);

module.exports = router;
