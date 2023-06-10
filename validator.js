const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    body("email", "Must be a valid email").isLowercase().isEmail().normalizeEmail(),
    // password must be at least 5 chars long
    body("password", "Must be at least 5 characters").isLength({ min: 5 }).escape()
  ];
};

const albumValidationRules = () => {
  return [
    body("name", "Album name must be a string").optional().isString().escape(),
    body("albumArtist", "Album artist must be a string").optional().isString().escape(),
    body("playTime", "Album play time must be in seconds").optional().isNumeric().toInt(),
    body("contributingArtists", "Album contributing artists must be a string")
      .optional()
      .isString()
      .escape(),
    body("coverArt", "Album cover art must be a string").optional().isString().escape(),
    body("year", "Album year must be a string").optional().isString().escape()
  ];
};

const trackValidationRules = () => {
  return [
    body("title", "Track title must be a string").optional().isString().escape(),
    body("albumID", "Track albumID must be a string").optional().isString().escape(),
    body("albumArtist", "Track album artist must be an string").optional().isString().escape(),
    body("artist", "Track artist must be an string").optional().isString().escape(),
    body("trackLength", "Track length must be a number").optional().isNumeric().toInt(),
    body("trackNumber", "Track number must be a number").optional().isNumeric().toInt(),
    body("genre", "Track genre must be a string").optional().isString().escape(),
    body("coverArt", "Track cover art must be a string").optional().isString().escape()
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
