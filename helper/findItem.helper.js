const createError = require("http-errors");
const { mongoose } = require("mongoose");

const findItem = async (model, id, options = {}, next) => {
  try {
    const item = await model.findById(id, options);

    if (!item) {
      return next(createError(404, `Not found`));
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(createError(404, `Invalid ID. Please enter a valid ID`));
    }
    return next(error);
  }
};

module.exports = {
  findItem,
};
