const express = require("express");
const router = express.Router();

const {getMyProfile , adminDashBoard , updateProfile} = require("../controllers/userController")
const {protect , authorizeRole} = require("../middleware/authMiddleware");

router.get("/me" ,protect,getMyProfile);
router.get("/admin" ,protect,authorizeRole("admin"),adminDashBoard)
router.put("/update-profile",protect,updateProfile);

module.exports = router;