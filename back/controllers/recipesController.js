const db = require("../db");
const { StatusCodes } = require("http-status-codes");

const getAllRecipes = async (req, res) => {
  const { category } = req.query;
  let queryString = "SELECT * FROM recipes JOIN categories USING (category_id)";
  let parameters = [];
  if (category) {
    queryString = `${queryString} WHERE categories.name=$1`;
    parameters.push(category);
  }
  const { rows: recipes } = await db.query(queryString, parameters);
  res.status(StatusCodes.OK).json({ count: recipes.length, recipes });
};

const createRecipe = async (req, res) => {
  const { title, image, instructions, ingredients, category_id } = req.body;
  const { userId } = req.user ?? 1;

  const {
    rows: [createdRecipe],
  } = await db.query(
    "INSERT INTO recipes (title, image, instructions, ingredients, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, image, instructions, ingredients, category_id, userId]
  );

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Created recipe", recipe: createdRecipe });
};

const getAllUserRecipes = async (req, res) => {
  const { rows: recipes } = await db.query(
    "SELECT * FROM recipes WHERE user_id = $1 ORDER BY recipe_id",
    [req.user.userId]
  );
  res.status(StatusCodes.OK).json({ count: recipes.length, recipes });
};

const getSingleRecipe = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [recipe],
  } = await db.query("SELECT * FROM recipes WHERE recipes_id = $1", [id]);

  res.status(StatusCodes.OK).json({ recipe });
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const {
    rows: [updatedRecipe],
  } = await db.query(
    "UPDATE recipes SET completed = $1 WHERE recipes_id = $2 RETURNING *",
    [completed, id]
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Updated recipe", recipe: updatedRecipe });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [deletedRecipe],
  } = await db.query("DELETE FROM recipes WHERE recipes_id = $1 RETURNING *", [
    id,
  ]);

  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted recipe", recipe: deletedRecipe });
};

module.exports = {
  createRecipe,
  getAllUserRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
};
