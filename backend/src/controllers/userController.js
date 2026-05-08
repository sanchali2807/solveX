const asyncHandler = require("../utils/asyncHandler");

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