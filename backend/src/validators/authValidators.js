const {body} = require("express-validator");

exports.registerValidator = [
    body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({min : 3 , max : 30})
    .withMessage("Username must be between 3 and 30 characters"),


    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),


    body("password")
    .notEmpty()
    .withMessage("Password required")

    .isLength({min : 8})
    .withMessage("Password must be min 8 characters")

    .matches(/[A-Z]/)
    .withMessage("Password must contain one uppercase letter")

    .matches(/[a-z]/)
    .withMessage("Password must contain one lowercase letter")

    .matches(/[0-9]/)
    .withMessage("Password must contain a digit")

    .matches(/[!@#$%&^*]/)
    .withMessage("Password must contain a special character ")
]


exports.loginValidator = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

    body("password")
    .notEmpty()
    .withMessage("Password required")
]