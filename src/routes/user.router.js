const express = require("express");
const {
  getUsers,
  getSingleUser,
  deleteUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
