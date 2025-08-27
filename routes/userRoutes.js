const express = require("express");
const { createUser, getAllUsers, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, error: "Admin access only" });
  }
  next();
};

router.use(authMiddleware);
router.use(adminOnly);

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
