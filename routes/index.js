const express = require("express");
const router = express();
const apiRoutes = require("./api");
const swagger = require("swagger-ui-express");
const swaggerDoc = require("../swagger/swagger-output.json");

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

router.use("/api", requiresAuth(), apiRoutes);
router.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));
router.use("/", (req, res) => {
  res.send("Use api/api-docs/ for how to use this service.");
});

module.exports = router;
