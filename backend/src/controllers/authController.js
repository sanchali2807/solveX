const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
exports.registerUser = asyncHandler(async function(req,res,next){
    const {username,email,password} = req.body;
    const existingUser = await User.findOne({
        // Find document where EITHER email matches OR username matches.
        $or : [
            {email : email},
            {username : username}
        ]
    });
    if(existingUser){
        return next(new ErrorHandler("User already exists",400));
    }

    const user = await User.create({
        username,
        email,
        password
    });
    sendToken(user,201,res);
})


//login
exports.loginUser = asyncHandler(async function(req,res,next){
    const {email,password} = req.body;

    //check user
    const user = await User.findOne({email}).select("+password");
    // Even though password is hidden by default, include it THIS TIME.
    if(!user){
        return next(new ErrorHandler("User does not exist",400));
    }

    //check password
    const isPasswordMatching = await user.comparePassword(password);
    if(!isPasswordMatching){
        return next(new ErrorHandler("Invalid password",400));
    }
    // send token
    sendToken(user,200,res);
})


exports.logoutUser = asyncHandler(async function(req,res){
    res.cookie("refreshToken"," ",{
        httpOnly : true,
        expires : new Date(0) 
        // Browser sees expired cookie and deletes it.
    });
    return res.status(200).json({
        success : true,
        message :"successfully logged out "
    })
})