require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/Error");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

//handling cors error
app.use(cors());

app.use(bodyParser.json());

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "This route will contain TEST RESULT LOGIN/SIGNUP button",
  });
});

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const user = require("./routes/user");
const paymentRoute = require("./routes/paymentRoutes");

//razorpay
app.use("/api/v1", user);

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

//router middleware
app.use(errorMiddleware);

//export app js
module.exports = app;

// ! To create route
