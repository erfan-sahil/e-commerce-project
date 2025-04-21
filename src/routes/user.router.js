const express = require("express");
const {
  getUsers,
  getSingleUser,
  deleteUser,
  userRegister,
  activateUser,
} = require("../controllers/user.controller");
const { upload } = require("../middlewares/uploadFiles");
const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), userRegister);

userRouter.post("/verify", activateUser);

userRouter.get("/", getUsers);

userRouter.get("/:id", getSingleUser);

userRouter.delete("/:id", deleteUser);

module.exports = {
  userRouter,
};
