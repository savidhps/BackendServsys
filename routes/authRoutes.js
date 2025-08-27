const express = require("express");
const { loginController, signupController } = require("../controllers/authController");

const router = express.Router();

// Routes
router.post("/login", loginController);
router.post("/signup", signupController);

module.exports = router;
