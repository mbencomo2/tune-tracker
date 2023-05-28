const { check, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    check("email", "Must be a valid email").isLowercase().isEmail().normalizeEmail(),
    // password must be at least 5 chars long
    check("password", "Must be at least 5 characters").isLength({ min: 5 }).escape().escape()
  ];
};

const albumValidationRules = () => {
  return [
    check("name", "Album name must be a string").optional().isString().escape(),
    check("albumArtist", "Album artist must be a string").optional().isString().escape(),
    check("playTime", "Album play time must be a string").optional().isString().escape(),
    check("contributingArtists", "Album contributing artists must be a string")
      .optional()
      .isString(),
    check("coverArt", "Album cover art must be a string").optional().isString().escape(),
    check("year", "Album year must be a string").optional().isString().escape()
  ];
};

const trackValidationRules = () => {
  return [
    check("title", "Track title must be a string").optional().isString().escape(),
    check("albumID", "Track albumID must be a string").optional().isString().escape(),
    check("albumArtist", "Track album artist must be an string").optional().isString().escape(),
    check("artist", "Track artist must be an string").optional().isString().escape(),
    check("trackLength", "Track length must be a string").optional().isString().escape(),
    check("trackNumber", "Track number must be a number").optional().isNumeric().escape(),
    check("genre", "Track genre must be a string").optional().isString().escape(),
    check("coverArt", "Track cover art must be a string").optional().isString().escape()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  albumValidationRules,
  trackValidationRules,
  validate
};
