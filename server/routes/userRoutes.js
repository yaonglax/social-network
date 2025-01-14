const express = require("express");
const userController = require("../controllers/UserController")
const authController = require('../controllers/AuthController')

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post('/login', authController.login)
router.post("/registration", authController.registration)
module.exports = router;
