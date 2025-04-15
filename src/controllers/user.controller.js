const createError = require("http-errors");
const { userModel } = require("../models/user.model");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 7;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const searchFilter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = {
      password: 0,
    };
    const users = await userModel
      .find(searchFilter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await userModel.find(searchFilter).countDocuments();

    if (!users) {
      throw createError(404, "No users found");
    }
    if (!users) {
      console.log("Could not find any user");
      res.status(400).json({
        message: "Could not find any user",
      });
    }
    res.status(200).json({
      message: "Fetched all the users",
      payload: users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
