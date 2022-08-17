require('dotenv').config();
const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();


// *********************************************************************************
app.use(express.json());//enabling json format req and response.
app.use(cors());//enabling cross origin response 
app.use(helmet());// provides security
app.use(morgan());// provides a logger to logout all api request.
// ***********************************************************************************

const Port = process.env.PORT || 5000
// ************************************************

// load Routers
const UserRouter = require("./src/Router/UserRouter")

const tokenRouter = require("./src/Router/tokenRouter")




// use Routers
app.use('/auth', UserRouter)
app.use('/token', tokenRouter)

// ******************************************************************
// connecting the mongoose database;
const mongoose = require("mongoose");
 mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
 });

//  to check if mongo is connected
const mongo =mongoose.connection
mongo.on('open', () => {
    console.log('mongoose is connected');
})
mongo.on('error', (error) => {
    console.log(error)
})


// *******************************************************
const errorHandler = require("./src/utils/errorHandler")
// error handling
app.use('*', (req, res,next) => {
    const error = new Error("resources not found");
    error.status = 404;


    next(error);

})
app.use('*', (error, req, res, next) => {
    errorHandler(error,res)
})
// **************************************************************************


app.listen(Port, () => {
    console.log("backened api started on 5000 Port");
})
