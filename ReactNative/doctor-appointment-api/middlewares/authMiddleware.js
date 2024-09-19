const jwt = require("jsonwebtoken");

// Middleware function for authentication
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1]; // Assumes "Bearer <token>"

  if (token) {
    // Verify the token using JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ message: "Unauthorized Access" });
      }
      // Attach decoded user info to the request object
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    // No token provided
    return res.status(403).json({ message: "Forbidden Access" });
  }
};

module.exports = authMiddleware;
