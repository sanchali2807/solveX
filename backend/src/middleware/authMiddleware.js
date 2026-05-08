const { jwt } = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

exports.protect = asyncHandler(async function(req,res,next){
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        next(new ErrorHandler("Not authorized. No token provided",401))
    }

    const decoded = jwt.verify(token , process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);

    if(!user)return next(new ErrorHandler("User no longer exists",401));

    req.user = user;
    next();
})

exports.authorizeRole = function(...roles){
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,403))
        }
        next();
    }
}