const Category = require("../models/Category.model");

module.exports.CategoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.json(`get categories error: ${error}`);
    }
  },
  createCategory: async (req, res) => {
    try {
      await Category.create({
        name: req.body.name,
      });
      res.status(200).json("Category create");
    } catch (error) {
      res.json(`create category error: ${error}`);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json("Category delete");
    } catch (error) {
      res.json(`delete category error: ${error}`);
    }
  },
};
