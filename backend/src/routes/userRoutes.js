const express = require("express");
const router = express.Router();

const {getMyProfile , adminDashboard} = require("../controller/userController")
const {protect , authorizeRole} = require("../middleware/authMiddleware");

router.get("/me" ,protect,getMyProfile);
router.get("/admin" , protect,authorizeRole("admin"),adminDashboard)

module.exports = router;