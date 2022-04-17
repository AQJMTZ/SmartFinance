require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");


//database
const connection = require("./db");

//database connection
connection();


//middlewwares
app.use(express.json())
app.use(cors());


const port  = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port', port,'...'));

//routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/logIn');

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);



