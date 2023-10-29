const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, _req, res, _next) => {
  console.log(err);

  const statusCodes = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Error, please try again later";

  res.status(statusCodes).json({ msg });
};

module.exports = errorHandlerMiddleware;
