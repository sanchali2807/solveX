require ("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDatabase = require("./src/database/db");

connectDatabase();
// we are using http instead of express because for socket io we need direct access to http server and  if we use express it also creates a http server but internally 

const server = http.createServer(app);

// app carries all routes, middleware, handlers, and configurations you defined in app.js, and acts as the request handling function for the HTTP server.
// create Server expects a callback function and app contains that 

const PORT = 5500 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})