require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
var compression = require('compression')
const iltorb = require('iltorb');
// const session = require('express-session')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const albumRoute = require("./routes/album.js");

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('storage'));

app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/album",albumRoute);

const port=process.env.PORT||3000;

app.listen(port, ()=> console.log(`Listening on port ${port}`))