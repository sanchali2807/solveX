const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// in mongo db id is stored as _id and if it is stored as user.id internally it is _id.toString

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
        trim : true,
        minlength : [3 , "Username must be atleast exceed length 3"],
        maxlength : [30 , "Username must not exceed length 30"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : [true , "Password is required"],
        minlength : [8, "Password must be 8 character long"],
        select : false
        // this is so that password can not be fetched using mongo db queries
    },
    avatar : {
        type : String,
        default : ""
    },
    bio :{
        type : String,
        default : ""
    },
    role : {
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    },
    refreshToken : {
        type : String,
        default : ""
    }
},
    {
        timestamps : true
    }
)

// hash password before save 
userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return ;
    }
    this.password = await bcrypt.hash(this.password,10);
    // next();
})

// compare password 
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generate access token
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
        id : this._id,
        role : this.role
    },
    process.env.JWT_ACCESS_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRE
    }
)
}


// generate refresh token

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        id : this._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRE
    }
)
}

const User = mongoose.model("User",userSchema);
module.exports = User;