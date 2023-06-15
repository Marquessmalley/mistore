require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();

app.use(
  cors({
    origin: "http:/localhost:3000",
    credentials: true, //alows cookie to be sent from client request
    optionsSuccessStatus: 200,
  })
);
// set security http headers
app.use(helmet());
// data sanitization against nosql query injection
app.use(mongoSanitize());
// data sanatization against XSS
app.use(xss());

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

module.exports = app;
