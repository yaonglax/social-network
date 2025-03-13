const express = require("express");
const userController = require("../controllers/UserController");
const authController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleware");

const router = express.Router();

router.get("/getAllUsers", userController.getAllUsers);
router.get('/getUserIdByName', userController.getUserIdByName)
router.get("/profile", authMiddleware, userController.getProfile);
router.get("/verify", verifyTokenMiddleware, (req, res) => {
    res.status(200).json({message: "Токен валиден", user: req.user});
});
router.get('/profile/:username', authMiddleware, userController.getUserProfile)
router.get("/:id", userController.getUserById);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post("/registration", authController.registration);

module.exports = router;
