const express = require("express");
const router = express();
const apiRoutes = require("./api");

const { auth, requiresAuth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.OAUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get("/auth", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}); 

// Routes for normal api use require login
router.use("/api", requiresAuth(), apiRoutes);

// Documentation does not require login
router.use("/api-docs", express.static("./public/schema"));

router.use("/", express.static(". /public/landing"));

module.exports = router;
