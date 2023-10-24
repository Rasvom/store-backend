const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  try {
    const { login, email } = req.body;
    const isLoginFree = await User.findOne({ login });
    const isEmailFree = await User.findOne({ email });
    if (isLoginFree) {
      return res
        .status(401)
        .json({ error: "Пользователь с таким логином уже существует" });
    }
    if (isEmailFree) {
      return res
        .status(401)
        .json({ error: "Пользователь с такой почтой уже существует" });
    }
    next();
  } catch (error) {
    return res.status(401).json(`valid error: ${error}`);
  }
};
