const { Router } = require("express");
const { CategoryController } = require("../controllers/category.controller");
const router = Router();

router.get("/get-categories", CategoryController.getCategories);
router.get("/create-category", CategoryController.createCategory);
router.get("/delete-category/:id", CategoryController.deleteCategory);

module.exports = router;