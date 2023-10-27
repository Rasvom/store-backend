const Cart = require("../models/Cart.model");

module.exports.CartController = {
  getUserCart: async (req, res) => {
    try {
      const userCart = await Cart.findOne({
        userId: res.user.id,
      }).populate("cart.product");
      res.json(userCart);
    } catch (error) {
        res.status(500).json({ error: "Ошибка получения корзины пользователя" });
    }
  },
};
