const createError = require("http-errors");
const { userModel } = require("../models/user.model");
const { successResponse } = require("../../helper/response.helper");
const { mongoose } = require("mongoose");
const { findItem } = require("../../helper/findItem.helper");
const { options } = require("../app");
const fs = require("fs");
const { deleteImage } = require("../../helper/deleteImage.helper");
const { createJsonWebToken } = require("../../helper/jsonWebToken.helper");
const { jwtActivisionKey } = require("../secret");
const { emailWithNodeMailer } = require("../../helper/email");
const jwt = require("jsonwebtoken");

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

    await deleteImage(userImagePath, next);

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

const userRegister = async (req, res, next) => {
  try {
    const { name, email, phone, address, password } = req.body;

    const userExists = await userModel.exists({ email });

    if (userExists) {
      next(
        createError(409, "User with this email already exists. Please login")
      );
    }

    console.log("name", name, "email", email);
    //createToken
    const token = createJsonWebToken(
      { name, email, phone, address, password },
      jwtActivisionKey,
      "10m",
      next
    );

    //prepare email
    const emailData = {
      email: email,
      subject: "Account Activision Mail",
      html: `
      <h2> Hello, ${name} </h2>
      <p> Please click here to <a style="color-red" href="http://localhost:4500/api/v1/user/verify/${token}"> Activate your account </a> </p>
      `,
    };

    //send email with nodemailer
    try {
      // await emailWithNodeMailer(emailData);
    } catch (error) {
      return next(
        createError(400, "Verification email failed. Please try again")
      );
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Verification email send. Please check your email",
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
const activateUser = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return next(createError(404, "Token not found"));
    }
    const decoded = jwt.verify(token, jwtActivisionKey);

    if (!decoded) {
      return next(createError(401, "Verfication failed"));
    }

    console.log("decoded", decoded);
    const userExists = await userModel.exists({ email: decoded.email });

    if (userExists) {
      return next(
        createError(409, "User with this email already exists. Please login")
      );
    }

    const newUser = await userModel.create(decoded);

    if (!newUser) {
      return next(createError(400, "Can't create user on the database"));
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User created successfully",
      payload: { newUser },
    });
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return next(createError(401, "Token has expired"));
    } else if (error.name == "JsonWebTokenError") {
      return next(createError(401, "Invalid Token"));
    }
    return next(error);
  }
};
module.exports = {
  getUsers,
  getSingleUser,
  deleteUser,
  userRegister,
  activateUser,
};
