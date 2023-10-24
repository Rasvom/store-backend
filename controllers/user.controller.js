const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  registration: async (req, res) => {
    try {
      const { login, password, name, subName, email } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        name: name,
        subName: subName,
        email: email,
        login: login,
        password: hash,
        role: "user",
      });
      res.json(user);
    } catch (error) {
      res.json(`registration error: ${error}`);
    }
  },
  login: async (req, res) => {
    try {
      const { login, password } = req.body;
      const candidate = await User.findOne({ login: login });
      const valid = await bcrypt.compare(password, candidate.password);

      if (!candidate) {
        return res.status(401).json({ error: "Неверный Логин или пароль" });
      }
      if (!valid) {
        return res.status(401).json({ error: "Неверный Логин или пароль" });
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "72h",
      });
      res.json(token);
    } catch (error) {
      res.json(`login error: ${error}`);
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
      const { name, subName, phone, email, login, address, zipCode } = req.body;
      const userId = req.user.id;
      console.log(login);
      const user = await User.findByIdAndUpdate(userId, {
        name: name,
        subName: subName,
        phone: phone,
        email: email,
        login: login,
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
      const userLogin = req.user.login;
      const candidate = await User.findOne({ login: userLogin });

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
      await User.findOneAndUpdate(userLogin, {
        password: hash,
      });
      res.json("Пароль успешно изменен!");
    } catch (error) {
      res.json(`change password error: ${error}`);
    }
  },
};
