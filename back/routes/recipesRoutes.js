const { Router } = require("express");
const router = Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware.js");

const {
  validateAddRecipeInput,
  validateUpdateRecipeInput,
  validateIdParam,
} = require("../middlewares/validationMiddleware.js");

const {
  createRecipe,
  getAllUserRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
} = require("../controllers/recipesController.js");

router.use(authenticateUser);
router.route("/admin").get(authorizePermissions("admin"), getAllRecipes);
router
  .route("/")
  .get(getAllUserRecipes)
  .post(validateAddRecipeInput, createRecipe);
router
  .route("/:id")
  .get(validateIdParam, getSingleRecipe)
  .put([validateIdParam, validateUpdateRecipeInput], updateRecipe)
  .delete(validateIdParam, deleteRecipe);

module.exports = router;
