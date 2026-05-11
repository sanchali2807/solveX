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

{
    "username" : "Sanchali(Admin)",
    "email" : "sanchali0728@gmail.com",
    "password" : "&Year280705"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmRkODdlNjJhYjQ2ZmYyM2Q4N2JjMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODI0MzcxMCwiZXhwIjoxNzc4MjQ0NjEwfQ.yR_MfUXq5iOOe-UaM06uAc8gIj_UiT9SmUonSwwNrWo
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmRkODdlNjJhYjQ2ZmYyM2Q4N2JjMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODI0NDU3NiwiZXhwIjoxNzc4MjQ1NDc2fQ.PNq5If7dytoMj91OJMtJ86W-UbwPPa7Nvb6Xoz_DyLc





eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmRkZDUyMmUxYWRhNDlmMzY2NjY4MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc4MjQ0OTQ2LCJleHAiOjE3NzgyNDU4NDZ9.bYmGwf0tom8EegMNDGc2c-EmpmC5mFC-ty0HkpipMqA{
    "username" : "heyy",
    "email" : "san1@gmail.com",
    "password" : "&Year122"
}


WHY MULTER EXISTS
Express cannot handle file uploads by default.
Multer:
parses multipart/form-data
extracts uploaded files
adds file info to:
