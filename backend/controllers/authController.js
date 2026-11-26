const jwt = require("jsonwebtoken");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const {
  REFRESH_COOKIE,
  refreshCookieOptions,
  clearCookieOptions,
  signAccessToken,
  signRefreshToken,
  hashToken,
} = require("../utils/generateToken");

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

const isString = (value) => typeof value === "string";

// Creates refresh token (cookie + DB) and sends access token
async function startSession(res, user, status = 200) {
  const { token, expiresAt } = signRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(token),
    expiresAt,
  });

  res.cookie(REFRESH_COOKIE, token, refreshCookieOptions);
  res.status(status).json({
    accessToken: signAccessToken(user._id),
    user: publicUser(user),
  });
}

// POST /api/auth/register
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!isString(name) || !isString(email) || !isString(password)) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return res
      .status(409)
      .json({ message: "An account with this email already exists" });
  }

  const user = await User.create({ name, email, password });
  await startSession(res, user, 201);
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;

  if (!isString(email) || !isString(password)) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  // Same message for wrong email or wrong password
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  await startSession(res, user);
}

// POST /api/auth/refresh
async function refresh(req, res) {
  const token = req.cookies[REFRESH_COOKIE];

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      algorithms: ["HS256"],
    });
  } catch {
    res.clearCookie(REFRESH_COOKIE, clearCookieOptions);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }

  // Each refresh token can be used only once (rotation)
  const stored = await RefreshToken.findOneAndDelete({
    tokenHash: hashToken(token),
  });

  if (!stored) {
    // Valid token that was already used: possible theft, revoke all sessions
    await RefreshToken.deleteMany({ user: payload.id });
    res.clearCookie(REFRESH_COOKIE, clearCookieOptions);
    return res
      .status(401)
      .json({ message: "Session expired. Please log in again." });
  }

  const user = await User.findById(payload.id);
  if (!user) {
    res.clearCookie(REFRESH_COOKIE, clearCookieOptions);
    return res.status(401).json({ message: "User no longer exists" });
  }

  await startSession(res, user);
}

// POST /api/auth/logout
async function logout(req, res) {
  const token = req.cookies[REFRESH_COOKIE];

  if (token) {
    await RefreshToken.deleteOne({ tokenHash: hashToken(token) });
  }

  res.clearCookie(REFRESH_COOKIE, clearCookieOptions);
  res.json({ message: "Logged out" });
}

// GET /api/auth/me
function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

module.exports = { register, login, refresh, logout, me };