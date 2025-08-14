require("dotenv").config();
const express = require("express");
const app = express();

//DataBase Connection
require("./config/database.js").connectDatabase();

//Logger (tiny Data/small data)
const logger = require("morgan");
app.use(logger("tiny"));

//Configure CORS
app.use(require("cors")({ origin: true, credentials: true }));

//BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//routes
app.use("/api", require("./routes/index.js"));

//Error Handling
const ErrorHandler = require("./utils/ErrorHandler.js");
const { generatedErrors } = require("./middlewares/error.js");
app.all(/(.*)/, (req,res,next)=>{
    next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`, 404));
});
app.use(generatedErrors);

//Port
app.listen(
  process.env.PORT,
  console.log(`server Running on Port ${process.env.PORT}`)
);