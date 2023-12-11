const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const authService = require("../service/authService");

module.exports.userController = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json(errors.array());
      }
      const { email, password, name, subName } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        name: name,
        subName: subName,
        email: email,
        password: hash,
        role: "user",
      });
      await Cart.create({
        userId: user._id,
      });
      res.json(user);
    } catch (error) {
      res.json(`registration error: ${error}`);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      const valid = await bcrypt.compare(password, candidate.password);

      if (!candidate) {
        return res.status(401).json({ error: "Неверный Логин или пароль" });
      }
      if (!valid) {
        return res.status(401).json({ error: "Неверный Логин или пароль" });
      }

      const payload = {
        id: candidate._id,
        email: candidate.email,
      };
      const { accessToken, refreshToken } =
        await authService.generateTokens(payload);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        secure: true,
      });
      return res.json({ accessToken, refreshToken, payload });
    } catch (error) {
      res.json(`login error: ${error}`);
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      return res.status(200).json("logout");
    } catch (error) {
      res.json(`logout user error: ${error}`);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2592000000,
        httpOnly: true,
        secure: true,
      });
      return res.json(userData);
    } catch (error) {
      next(`logout user error: ${error}`);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.json(`get user error: ${error}`);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, subName, phone, email, address, zipCode } = req.body;
      const userId = req.user.id;
      const user = await User.findByIdAndUpdate(userId, {
        name: name,
        subName: subName,
        phone: phone,
        email: email,
        address: address,
        zipCode: zipCode,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json(`Error user update: ${error}`);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const userEmail = req.user.email;
      const candidate = await User.findOne({ email: userEmail });

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль!" });
      }

      if (password.length < 5) {
        return res
          .state(401)
          .json("Пароль не может быть меньше 5-ти символов!");
      }
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      await User.findOneAndUpdate(userEmail, {
        password: hash,
      });
      res.json("Пароль успешно изменен!");
    } catch (error) {
      res.json(`change password error: ${error}`);
    }
  },
};
