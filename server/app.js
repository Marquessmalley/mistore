require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
console.log(process.env.DOMAIN);

app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true, //alows cookie to be sent from client request
    optionsSuccessStatus: 200,
  })
);

app.use("/images", express.static(path.join(__dirname, "/public/images")));
app.use(express.json());
app.use(cookieParser());
// app.use("/public/images", express.static(path.join(__dirname, "uploads")));
// set security http headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongoSanitize());
// data sanatization against XSS
app.use(xss());

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const financialsRoutes = require("./routes/financialsRoutes");

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/create-payment-intent", paymentRoutes);
app.use("/financials", financialsRoutes);

module.exports = app;
