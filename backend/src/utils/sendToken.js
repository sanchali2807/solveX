// const User = require("../models/userModel")

const sendToken = async function(user,statusCode,res){
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token in user 
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

}