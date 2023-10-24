const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [],
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
