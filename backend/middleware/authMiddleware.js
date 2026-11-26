const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function protect(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
      algorithms: ["HS256"],
    });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = await User.findById(payload.id);
  if (!user) {
    return res.status(401).json({ message: "User no longer exists" });
  }

  req.user = user;
  next();
}

module.exports = { protect };