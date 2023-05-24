const { body, validationResult } = require("express-validator");
const userValidationRules = () => {
  return [
    // username must be an email
    body("email").isLowercase().isEmail().withMessage("Must be a valid email"),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }).withMessage("Must be at least 5 characters")
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
  validate
};
