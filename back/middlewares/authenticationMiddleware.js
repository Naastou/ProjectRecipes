const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log(token);
    const { name, userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

const authorizePermissions = (...roles) => {
  return (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Access denied");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
