const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ success: false, error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ success: false, error: "Invalid token" });

    req.user = { id: user._id, role: user.role, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
