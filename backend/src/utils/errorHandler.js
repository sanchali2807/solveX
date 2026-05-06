class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        // calls the error class 
        this.statusCode = statusCode;

        // `{statusCode}` converts number to string 
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        // this is needed to sepaarte pragramme error with the expected error liek email already exists
        Error.captureStackTrace(this,this.constructor);
        // Removes unnecessary constructor calls from stack trace.
    }
}

module.exports = ErrorHandler