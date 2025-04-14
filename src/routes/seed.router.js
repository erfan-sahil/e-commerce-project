const express = require("express");
const { seedUsers } = require("../controllers/seed.controller");
const seedRouter = express.Router();

seedRouter.post("/users", seedUsers);

module.exports = {
  seedRouter,
};
