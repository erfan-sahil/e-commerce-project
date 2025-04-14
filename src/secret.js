require("dotenv").config();

const port = process.env.PORT || 3500;

const mongoURL = process.env.MONGO_URL;

module.exports = {
  port,
  mongoURL,
};
