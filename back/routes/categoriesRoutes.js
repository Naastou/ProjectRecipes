const { Router } = require("express");
const router = Router();

const { getCategories } = require("../controllers/categoriesControllers");
router.route("/").get(getCategories);
module.exports = router;
