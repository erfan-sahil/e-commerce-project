const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const createError = require("http-errors");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//client error
app.use((req, res, next) => {
  createError(404, "Route not found");
  next();
});

//server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    messge: err.message,
  });
});

app.get("/test", (req, res) => {
  console.log("App is running successfully");
  res.send({ msg: "App is runnnig successfully" });
});

module.exports = app;
