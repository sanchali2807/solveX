const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = function (
    error,
    request,
    response,
    next
) {

    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    // mongo db error
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid: ${error.path}`;
        error = new ErrorHandler(message, 404);
    }

    // duplicate key error
    if (error.code === 11000) {
        const duplicatedField = Object.keys(error.keyValue)[0];
        const message = `${duplicatedField} already exists`;
        error = new ErrorHandler(message, 400);
    }

    // mongoose validation error
    if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
            function (value) {
                return value.message;
            }
        );
        const message = validationErrors.join(", ");
        error = new ErrorHandler(message, 400);
    }

    // invalid jwt token
    if (error.name === "JsonWebTokenError") {
        error = new ErrorHandler("Invalid token", 401);
    }

    // token expired
    if (error.name === "TokenExpiredError") {
        error = new ErrorHandler("Token expired", 401);
    }


    response.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};

module.exports = errorMiddleware;