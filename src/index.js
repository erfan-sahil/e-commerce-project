const express = require("express");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const port = process.env.PORT || 4500;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  console.log("is loggedin function");
};

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/test", isLoggedIn, (req, res) => {
  console.log("App is running successfully");
  res.send({ msg: "App is runnnig successfully" });
});
