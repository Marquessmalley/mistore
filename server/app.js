require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://d9x2mvvjewir2.cloudfront.net"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   next();
// });

app.use(
  cors({
    // origin: "https://d9x2mvvjewir2.cloudfront.net",
    origin: "http://localhost:3000",
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

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

module.exports = app;
