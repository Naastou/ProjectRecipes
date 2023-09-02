const { Router } = require("express");
const router = Router();

const {
  authenticateUser,
} = require("../middlewares/authenticationMiddleware.js");
const { getUser, getAllUsers } = require("../controllers/userController.js");

router.get("/current-user", authenticateUser, getUser);

router.get("/", authenticateUser, getAllUsers);

module.exports = router;
