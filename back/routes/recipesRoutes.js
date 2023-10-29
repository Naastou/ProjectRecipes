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
    authenticateUser,
    authorizePermissions("admin"),
    validateRecipeInput,
    createRecipe
  );
router
  .route("/:id")
  .get(validateIdParam, getSingleRecipe)
  .put(
    authenticateUser,
    authorizePermissions("admin"),
    [validateIdParam, validateRecipeInput],
    updateRecipe
  )
  .delete(
    authenticateUser,
    authorizePermissions("admin"),
    validateIdParam,
    deleteRecipe
  );

module.exports = router;
