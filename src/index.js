const express = require("express");
const app = express();

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
