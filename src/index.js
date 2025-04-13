const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 4500;

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/test", (req, res) => {
  console.log("App is running successfully");
  res.send({ msg: "App is runnnig successfully" });
});
