// middleware/authenticateToken.js
// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"]; // expects "Bearer <token>"
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       // covers both expired and tampered/invalid tokens
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }

//     req.user = decoded; // attach decoded payload (e.g. { id, email }) to request
//     next();
//   });
// }

// module.exports = authenticateToken;