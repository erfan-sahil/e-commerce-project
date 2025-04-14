const createError = require("http-errors");
const { data } = require("../../fakeData");
const { userModel } = require("../models/user.model");

const seedUsers = async (req, res, next) => {
  try {
    await userModel.deleteMany({});
    const seededUsers = await userModel.insertMany(data.fakeUsers);
    if (!seededUsers) {
      next(createError(400, "Users could not seeded"));
      console.error("Users could not seeded");
    }

    res.status(200).json({
      message: "Fake data users seeded",
      payload: seededUsers,
    });
    console.log("Users seeded");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  seedUsers,
};
