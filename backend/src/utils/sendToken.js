// const User = require("../models/userModel")
// we store the refresh token in cookie and access token in the frontend 
const sendToken = async function(user,statusCode,res){
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

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
    res.status(statusCode).cookie("refresh token",refreshToken,cookieOption).json({
        success : true,
        accessToken,
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })

}

module.exports = sendToken;