require("dotenv").config();

const port = process.env.PORT || 3500;

const mongoURL = process.env.MONGODB_URL;

const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE || "public/image/users/default.png";

module.exports = {
  port,
  mongoURL,
  defaultUserImage,
};
