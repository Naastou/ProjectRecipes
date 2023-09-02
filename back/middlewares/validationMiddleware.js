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

        if (errorMessages[0].startsWith("Pas d'article")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("Accès non")) {
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
    .withMessage("Le nom est requis")
    .isLength({ min: 3, max: 50 })
    .withMessage("Le nom doit contenir entre 3 et 50 caractères")
    .escape(),
]);

const validateRegisterInput = withValidationErrors([
  body("name").trim().notEmpty().withMessage("Le nom est requis").escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape()
    .custom(async (email) => {
      const {
        rows: [user],
      } = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user) {
        throw new Error("L'email existe déjà");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .escape(),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est requis")
    .escape(),
]);

const validateAddRecipeInput = withValidationErrors([
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
  body("category_id")
    .notEmpty()
    .withMessage("Category-id is required")
    .escape(),
]);

// validateUpdateRecipeInput
const validateUpdateRecipeInput = withValidationErrors(
  body("completed").trim().isBoolean().withMessage("Type invalide").escape()
);

// validateIdParam
const validateIdParam = withValidationErrors(
  param("id").custom(async (id, { req }) => {
    if (isNaN(Number(id))) {
      throw new Error("Id non valide");
    }

    const {
      rows: [recipe],
    } = await db.query("SELECT * FROM recipes WHERE recipe_id = $1", [id]);

    if (!recipe) {
      throw new Error(`No recipes with this id ${id}`);
    }

    const isOwner = req.user.userId === recipe.user_id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new Error("Accès non autorisé");
    }
  })
);

module.exports = {
  validateTest,
  validateLoginInput,
  validateRegisterInput,
  validateAddRecipeInput,
  validateUpdateRecipeInput,
  validateIdParam,
};
