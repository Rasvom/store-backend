const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    require: true,
  },
  cart: [
    {
      product: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
