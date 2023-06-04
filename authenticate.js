const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1]; // using: Bearer *token*

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.id = user.id;
    next();
  });
}

module.exports = authenticateToken;