const { Router } = require("express");
const { CartController } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/get-user-cart", authMiddleware, CartController.getUserCart);

module.exports = router;
