const db = require("../db");
const { StatusCodes } = require("http-status-codes");

const getAllRecipes = async (req, res) => {
  const { category, search } = req.query;
  let queryString = "SELECT * FROM recipes JOIN categories USING (category_id)";
  const parameters = [];
  const whereClauses = [];
  if (category) {
    whereClauses.push(`categories.name=$${parameters.length + 1}`);
    parameters.push(category);
  }

  if (search) {
    whereClauses.push(`recipes.title ILIKE $${parameters.length + 1}`);
    parameters.push(`%${search}%`);
  }

  // pagination + limite
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const {
    rows: [{ count }],
  } = await db.query(
    `SELECT COUNT (*) FROM recipes JOIN categories USING (category_id) ${
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""
    }`,
    parameters
  );

  queryString = `${queryString} ${
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""
  } LIMIT $${parameters.length + 1} OFFSET $${parameters.length + 2}`;
  parameters.push(limit, offset);

  const { rows: recipes } = await db.query(queryString, parameters);

  const numOfPages = Math.ceil(count / limit);
  res
    .status(StatusCodes.OK)
    .json({ count, recipes, numOfPages, currentPage: page });
};

const createRecipe = async (req, res) => {
  const { title, image, instructions, ingredients, category_id } = req.body;
  const { userId } = req.user;

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
  const { title, image, instructions, ingredients, category_id } = req.body;

  const {
    rows: [updatedRecipe],
  } = await db.query(
    "UPDATE recipes SET title = $1, image =$2, instructions=$3, ingredients=$4, category_id=$5 WHERE recipes_id=$6 RETURNING *",
    [title, image, instructions, ingredients, category_id, id]
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
