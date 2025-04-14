const express = require("express");
const mongoose = require("mongoose");
const { mongoURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongoURL, options);
    console.log("MongoDB connected successfully");

    mongoose.connection.on("error", (error) => {
      console.error("DB connection error", error);
    });
  } catch (error) {
    console.log("Could not connect to the database", error);
  }
};

module.exports = connectDB;
