const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const createJsonWebToken = (
  payload = {},
  jwtActivisionKey,
  expiresIn = "10m"
) => {
  if (typeof payload !== "object" || !payload) {
    throw createError(400, "payload should be non empty object");
  }
  if (typeof jwtActivisionKey !== "string" || jwtActivisionKey == "") {
    throw createError(400, "key should be non empty string");
  }

  try {
    const token = jwt.sign(payload, jwtActivisionKey, { expiresIn });
    return token;
  } catch (error) {
    console.log("failed to create jwt token");
    throw error;
  }
};

module.exports = {
  createJsonWebToken,
};
