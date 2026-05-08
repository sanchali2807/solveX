server.js (starts the backend server checks the connectivity with the server and make a node server)
    ↓
app.js (main express config file and adds middleware that runs before routes)
    ↓
Routes ()
    ↓
Validators
    ↓
Controllers
    ↓
Database
    ↓
Response

if any error happens errorMiddleware handles it 