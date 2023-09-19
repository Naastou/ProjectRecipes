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

router
  .route("/admin")
  .get(authenticateUser, authorizePermissions("admin"), getAllRecipes);
router
  .route("/")
  .get(getAllRecipes)
  .post(validateAddRecipeInput, authenticateUser, createRecipe);
router
  .route("/:id")
  .get(validateIdParam, getSingleRecipe)
  .put(
    [validateIdParam, validateUpdateRecipeInput],
    authenticateUser,
    updateRecipe
  )
  .delete(validateIdParam, authenticateUser, deleteRecipe);

module.exports = router;
