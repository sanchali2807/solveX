const mongoose = require("mongoose");
const connectDatabase = async function(){
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connection.connection.host}`);

    }catch(err){
        console.log("Error connecting to Database",err.message);
        process.exit(1);
        // this line is if the database connection fails the server sould stop immediately 
    }
}

module.exports = connectDatabase;