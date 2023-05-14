require("dotenv").config();
const Razorpay = require("razorpay");
const app = require("./app");
const connectWithDb = require("./config/db");

//connection with database
connectWithDb();

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});

// ! Index File main connection of Nodejs and MongoDB
