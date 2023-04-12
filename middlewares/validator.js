const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("fullName", "This field is required").notEmpty(),
  check("email", "This field is required").notEmpty(),
  check("email", "This field is required").isEmail(),
  check("password", "This field should be at least 6 charracters").isLength({
    min: 6,
  }),
];

exports.validatorr = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(406).json({ errors: errors.array() });
};
