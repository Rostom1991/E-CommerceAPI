require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");

//.env file variables
const port = process.env.PORT;
const mongo = process.env.MONGO;

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/auth", authRoute);
app.use("/contact", contactRoute);

//Connect to Database
mongoose
  .connect(mongo)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Server is Running!");
});
