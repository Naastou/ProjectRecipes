const { Router } = require("express");
const router = Router();

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware.js");

const {
  validateRecipeInput,
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

router.route("/admin").get(getAllRecipes);
router
  .route("/")
  .get(getAllRecipes)
  .post(
    validateRecipeInput,
    authenticateUser,
    authorizePermissions("admin"),
    createRecipe
  );
router
  .route("/:id")
  .get(validateIdParam, getSingleRecipe)
  .put(
    [validateIdParam, validateRecipeInput],
    authenticateUser,
    authorizePermissions("admin"),
    updateRecipe
  )
  .delete(
    validateIdParam,
    authenticateUser,
    authorizePermissions("admin"),
    deleteRecipe
  );

module.exports = router;
