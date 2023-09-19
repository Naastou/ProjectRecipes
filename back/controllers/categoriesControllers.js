const { StatusCodes } = require("http-status-codes");

const db = require("../db");
const getCategories = async (_req, res) => {
  const { rows: categories } = await db.query("SELECT * FROM categories");
  res.status(StatusCodes.OK).json({ count: categories.length, categories });
};

module.exports = { getCategories };
