const fs = require("fs").promises;

const deleteImage = async (userImagePath, next) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("Image deleted succssfully");
  } catch (error) {
    console.log("User image does not exist");
    next(error);
  }
};

module.exports = {
  deleteImage,
};
