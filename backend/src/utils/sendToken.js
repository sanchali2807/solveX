// const User = require("../models/userModel")
// we store the refresh token in cookie and access token in the frontend 
const sendToken = async function(user,statusCode,res,message){
    const accessToken = await user.generateAccessToken();
const refreshToken = await user.generateRefreshToken();

    // save refresh token in user 
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

    // cookie option
    const cookieOption = {
        httpOnly : true,
        // JS cannot access 
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict"
    }
    
    // send response
    res.status(statusCode).cookie("refreshToken",refreshToken,cookieOption).json({
        success : true,
        accessToken,
        message,
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })

}

module.exports = sendToken;