const express = require("express");
const { getUsers, getSingleUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

module.exports = {
  userRouter,
};
