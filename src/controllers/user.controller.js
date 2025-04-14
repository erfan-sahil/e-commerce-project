const createError = require("http-errors");

const getUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      msg: "Fetched all the users",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
