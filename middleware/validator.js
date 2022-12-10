const { check, validationResult } = require('express-validator');

exports.userValidator = [
  check('name').trim().not().withMessage('Name is Missing'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage('Passowrd must be 8 to 20 character long'),
];
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
