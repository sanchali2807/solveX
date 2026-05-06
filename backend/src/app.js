const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("mongo-sanitize");
const hpp = require("hpp");
const compression = require("compression");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();





// SECURITY MIDDLEWARE
// add security headers
app.use(helmet());


// CORS CONFIGURATION
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);


// RATE LIMITING
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);


// BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// COOKIE PARSER
// read cookies 
app.use(cookieParser());


// LOGGER
// request logger , shows reques method , route ,status code etc 
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


// DATA SANITIZATION
app.use(function (request, response, next) {

    if (request.body) {
        request.body = mongoSanitize(request.body);
    }

    if (request.query) {
        request.query = mongoSanitize(request.query);
    }

    if (request.params) {
        request.params = mongoSanitize(request.params);
    }

    next();
});


// PREVENT PARAMETER POLLUTION
app.use(hpp());


// COMPRESSION
app.use(compression());


// TEST ROUTE
app.get("/", function (request, response) {

    response.status(200).json({
        success: true,
        message: "CodeForge API Running"
    });
});

app.use(errorMiddleware);


module.exports = app;