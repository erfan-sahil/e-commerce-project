const createError = require("http-errors");
const { userModel } = require("../models/user.model");
const { successResponse } = require("../../helper/response.helper");
const { mongoose } = require("mongoose");
const { findItem } = require("../../helper/findItem.helper");
const { options } = require("../app");
const fs = require("fs");

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
      return next(createError(404, "No user found"));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Fetched all the users",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const options = {
      password: 0,
    };
    const user = await userModel.findById(userId, options);

    if (!user) {
      return next(createError(404, "User does not exist"));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User found successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, "Invalid user ID"));
    }
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const userExist = await userModel.findById(userId, options);

    if (!userExist) {
      return next(createError(404, "User does not exist"));
    }

    const userImagePath = user.image;

    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("user image does not exist");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log("user image deleted");
        });
      }
    });

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return next(createError(400, "Could not delete user"));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(400, "Invalid user ID"));
    }
    next(error);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  deleteUser,
};
