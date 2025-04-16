const express = require("express");
const {
  getUsers,
  getSingleUser,
  deleteUser,
  userRegister,
  activateUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegister);

userRouter.post("/verify", activateUser);

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
