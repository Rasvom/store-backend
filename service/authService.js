const jwt = require("jsonwebtoken");
const { unAuthorizedError } = require("../exceptions/apiError");
const User = require("../models/User.model");

const generateTokens = async (payload) => {
  try {
    const accessToken = await jwt.sign(
      payload,
      process.env.SECRET_ACCSESS_JWT,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = await jwt.sign(
      payload,
      process.env.SECRET_REFRESH_JWT,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

const refresh = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw unAuthorizedError();
    }
    const candidate = jwt.verify(refreshToken, process.env.SECRET_REFRESH_JWT);
    if (!candidate) {
      throw unAuthorizedError();
    }
    const payload = {
      id: candidate._id,
      email: candidate.email,
    };
    const tokens = await generateTokens(payload);
    return {...tokens, payload}
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  refresh,
};
