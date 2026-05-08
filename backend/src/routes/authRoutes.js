const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const {loginValidator,registerValidator} = require("../validators/authValidators")
const validateMiddleware = require("../middleware/validateMiddleware");
const router = express.Router();

router.post("/register",registerValidator,validateMiddleware,registerUser);
router.post("/login",loginValidator,validateMiddleware,loginUser);
router.get("/loggout",logoutUser);

module.exports = router;