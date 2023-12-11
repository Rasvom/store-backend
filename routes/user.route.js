const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const userValidMiddleware = require("../middlewares/userValid.middleware");
const { body } = require("express-validator");

const router = Router();
router.post(
  "/sign-up",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("name").isAlpha(),
  body("subName").isAlpha(),
  userValidMiddleware,
  userController.registration
);
router.post("/sign-in", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);
router.get("/user", authMiddleware, userController.getUser);
router.patch(
  "/edit-user",
  authMiddleware,
  userValidMiddleware,
  userController.updateUser
);
router.patch("/change-password", authMiddleware, userController.changePassword);

module.exports = router;
