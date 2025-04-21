const multer = require("multer");
const { uploadDir, maxFileSize, allowedFileTypes } = require("../secret");
const path = require("path");
const createError = require("http-errors");

const maximumFileSize = Number(maxFileSize);

const fileTypes = allowedFileTypes;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extname, "") + extname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!fileTypes.includes(extname.substring(1))) {
    return cb(createError(400, "File type not allowed"));
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  limits: { fileSize: maximumFileSize },
  fileFilter,
});

module.exports = {
  upload,
};
