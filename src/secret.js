require("dotenv").config();

const port = process.env.PORT || 3500;

const mongoURL = process.env.MONGODB_URL;

const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE || "public/image/users/default.png";

const jwtActivisionKey =
  process.env.JWT_ACTIVISION_KEY ||
  "dgsdgsdgsdt3534teryrhtu686iuytkjmgffdefe32";

const smtpUserName = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const uploadDir = process.env.UPLOAD_DIR || "public/image/users";

const maxFileSize = process.env.MAX_FILE_SIZE || 2 * 1024 * 1024;

const allowedFileTypes = process.env.ALLOWED_FILE_TYPES || [jpg, png, jpeg];

module.exports = {
  port,
  mongoURL,
  defaultUserImage,
  jwtActivisionKey,
  smtpUserName,
  smtpPassword,
  uploadDir,
  maxFileSize,
  allowedFileTypes,
};
