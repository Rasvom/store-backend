const { Router } = require("express");
const { ProductController } = require("../controllers/product.controller");

const router = Router();

router.get("/get-products", ProductController.getProducts);
router.get("/get-product", ProductController.getProduct);
router.get("/get-product", ProductController.getCategoryProducts);
router.post("/create-product", ProductController.createProduct);

module.exports = router;
