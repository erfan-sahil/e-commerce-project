const uploadDir = "public/image/users";

const maxFileSize = 2 * 1024 * 1024;

const allowedFileTypes = ["jpg", "png", "jpeg"];

module.exports = {
  uploadDir,
  maxFileSize,
  allowedFileTypes,
};
