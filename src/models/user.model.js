const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultUserImage } = require("../secret");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [3, "User name length can be minimum 3 character"],
      maxLength: [31, "User name length can be maximum 31 character"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please, enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [3, "User name length can be minimum 3 character"],
      maxLength: [31, "User name length can be maximum 31 character"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultUserImage,
    },
    address: {
      type: String,
      required: [true, "User address is required"],
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model(userSchema);

module.exports = {
  userModel,
};
