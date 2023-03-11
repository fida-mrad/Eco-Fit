const userRoutes = require('./routes/auth.router')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config()



app.use(express.json())

// db
mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.MONGO_URL,
    console.log("db connected")
);


const PORT = 8000;
app.listen(PORT, () => {
  console.log("server is active");
});

app.use(cookieParser());

        
                                  
// routes
app.use(userRoutes)



