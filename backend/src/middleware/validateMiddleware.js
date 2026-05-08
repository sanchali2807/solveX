const {validationResult} = require("express-validator");
const ErrorHandler = require("../utils/errorHandler");


const validateMiddleware= function(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const firstError = errors.array()[0];

        return next(new ErrorHandler(firstError.msg,400))
    }
    next();
}

module.exports = validateMiddleware