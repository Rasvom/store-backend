const { Router } = require("express");
const { ProductController } = require("../controllers/product.controller");

const router = Router();

router.get("/get-products", ProductController.getProducts);
router.get("/get-product/:id", ProductController.getProduct);
router.get("/get-product/:id", ProductController.getCategoryProducts);
router.post("/create-product", ProductController.createProduct);

module.exports = router;
