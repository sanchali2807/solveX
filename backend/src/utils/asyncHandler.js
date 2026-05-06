 

 // without Async handler we use try and catch in each controller but will this we just need to pass the function
 
 const asyncHandler = function(requestHandler){
    // this expects a function and returns a middleware because express understands only in middleware format
    return function(req,res,next){
        // async await return a promise so we recieve the promise and check it there is any error or not 
        Promise.resolve(requestHandler(req,res,next))
        .catch(function(error){
            // if error calls the error middleware 
            next(error);
            // when you pass something in next express treats it as an error and directly sends it to error middleware 
        });
    };
 };

 module.exports = asyncHandler;