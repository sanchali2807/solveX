const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const filterObject = require("../utils/filterObject");

exports.getMyProfile = asyncHandler(async function(req,res,next){
    return res.status(200).json({
        success : true,
        user : req.user
    })
})

exports.adminDashBoard = asyncHandler(async function(req,res,next){
    return res.status(200).json({
        success : true,
        message : "Welcome Admin"
    })
})


// what can the user modify
exports.updateProfile = asyncHandler(async function(req,res,next){
    if(req.body.password){
        return next(new ErrorHandler("User can not update the password field",400));
    }
    const filteredData = filterObject(
        req.body , 
        "username",
        "bio",
        "avtar"
    )
    // await User.findByIdAndUpdate(id, data, options)
    // By default MongoDB returns OLD document. so with new it returns updated user
    const updatedUser = await User.findByIdAndUpdate(req.user.id,
        filteredData,
        {
            new : true,
            runValidators : true //. so that all validations are run
        } 
    )
    return res.status(200).json({
        success : true,
        message : "Updated successfully",
        user : updatedUser
    })
})

// update password

exports.updatePassword = asyncHandler(async function(req,res,next){
    // get user with password
    const user = await User.findById(req.user.id).select("+password");

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    //verify current password
    const isPasswordCorrect = await user.comparePassword(req.body.currentPassword);

    if(!isPasswordCorrect){
        return new next(new ErrorHandler("Password is incorrect",401));
    }
    
    // update password
    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({
        success : true,
        message : "Password updated successfully",

    })
})