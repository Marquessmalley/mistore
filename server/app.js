require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

module.exports = app;
