const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const { userRouter } = require("./routes/user.router");
const { seedRouter } = require("./routes/seed.router");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many request from this IP. Please try again later",
});

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  console.log("App is running successfully");
  res.status(200).json({ msg: "App is runnnig successfully" });
});

//user router
app.use("/api/v1/user", userRouter);

//seed router
app.use("/api/v1/seed", seedRouter);

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

module.exports = app;
