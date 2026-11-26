const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const REFRESH_COOKIE = "refreshToken";

const clearCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
};

// Keep maxAge in sync with JWT_REFRESH_EXPIRES (7 days)
const refreshCookieOptions = {
  ...clearCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function signAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });
}

function signRefreshToken(userId) {
  // jti makes every refresh token unique
  const token = jwt.sign(
    { id: userId, jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" }
  );
  const { exp } = jwt.decode(token);
  return { token, expiresAt: new Date(exp * 1000) };
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = {
  REFRESH_COOKIE,
  refreshCookieOptions,
  clearCookieOptions,
  signAccessToken,
  signRefreshToken,
  hashToken,
};