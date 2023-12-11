const User = require("../models/User.model");

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailFree = await User.findOne({ email });
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
