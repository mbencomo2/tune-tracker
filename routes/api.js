const express = require("express");
const router = express();
const { graphqlHTTP } = require("express-graphql");
const albums = require("../controllers/albums");
const tracks = require("../controllers/tracks");
const schema = require("../schema/schema");
require("dotenv").config();
// const { validate, albumValidationRules } = require("../validator");

router.use(
  "/",
  graphqlHTTP((req) => {
    return {
      schema: schema,
      rootValue: {...albums, ...tracks},
      graphiql: process.env.NODE_ENV === "development",
      context: { oidc: req.oidc, userID: req.oidc.user.sub },
    };
  })
  
);

module.exports = router;
