const express = require('express');
const app = express();
const port=5000;
const dotenv = require('dotenv');
dotenv.config();
require('./config/connectDB');

//parse the data
app.use(express.json());

//route
app.use('/Users' , require('./routes/UserRoutes'))




//create server
app.listen(5000,(err)=>
err ? console.log(err) : console.log('server is running on port 5000')
);