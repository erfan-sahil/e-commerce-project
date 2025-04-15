const express = require("express");
const {
  getUsers,
  getSingleUser,
  deleteUser,
  userRegister,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegister);

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
