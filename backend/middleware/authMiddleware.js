const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      const user = await User.findById(decoded.id).select("-password");

      console.log("User:", user);

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;

      return next();

    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  return res.status(401).json({
    message: "No token found",
  });
};

module.exports = { protect };