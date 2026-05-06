const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
        trim : true,
        minLength : [3 , "Username must be atleast exceed length 3"],
        maxLength : [30 , "Username must not exceed length 30"]
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
        minLength : [8, "Password must be 8 character long"],
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
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})