const { body, param, validationResult } = require("express-validator");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors/index.js");
const db = require("../db");

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, _res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("No items")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("Access denied")) {
          throw new UnauthorizedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

//  test
const validateTest = withValidationErrors([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("The name must contain between 3 and 50 characters")
    .escape(),
]);

const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Name is required").escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .escape()
    .custom(async (email) => {
      const {
        rows: [user],
      } = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user) {
        throw new Error("The email already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .escape(),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .escape(),
]);

const validateRecipeInput = withValidationErrors([
  body("title").trim().notEmpty().withMessage("Title is required").escape(),
  body("image").notEmpty().withMessage("Url is required").escape(),
  body("instructions")
    .notEmpty()
    .withMessage("Instructions are required")
    .escape(),
  body("ingredients")
    .notEmpty()
    .withMessage("Ingredients are required")
    .escape(),
]);

// validateIdParam
const validateIdParam = withValidationErrors(
  param("id").custom(async (id, { req }) => {
    if (isNaN(Number(id))) {
      throw new Error("Invalide Id");
    }

    const {
      rows: [recipe],
    } = await db.query("SELECT * FROM recipes WHERE recipes_id = $1", [id]);

    if (!recipe) {
      throw new Error(`No recipes with this id ${id}`);
    }
  })
);

module.exports = {
  validateTest,
  validateLoginInput,
  validateRegisterInput,
  validateRecipeInput,
  validateIdParam,
};
