const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const userValidMiddleware = require("../middlewares/userValid.middleware");

const router = Router();

router.post(
  "/sign-up",
  userValidMiddleware,
  userValidMiddleware,
  userController.registration
);
router.post("/sign-in", userController.login);
router.get("/user", authMiddleware, userController.getUser);
router.patch(
  "/edit-user",
  authMiddleware,
  userValidMiddleware,
  userController.updateUser
);
router.patch("/change-password", authMiddleware, userController.changePassword);

module.exports = router;
