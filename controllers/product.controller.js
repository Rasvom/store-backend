const Product = require("../models/Product.model");

module.exports.ProductController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.json(`get products error: ${error}`);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.json(`get product error: ${error}`);
    }
  },
  getCategoryProducts: async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.id });
      res.json(products);
    } catch (error) {
      res.json(`get category products error: ${error}`);
    }
  },
  createProduct: async (req, res) => {
    try {
      await Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images,
        category: req.body.category,
      });
    } catch (error) {
      res.json(`create product error: ${error}`);
    }
  },
};
