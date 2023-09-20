require("express-async-errors");
require("dotenv").config();
const helmet = require("helmet");
const { validateTest } = require("./middlewares/validationMiddleware.js");

const express = require("express");

const app = express();

// middlewares
const notFound = require("./middlewares/notFoundMiddleware.js");
const errorHandler = require("./middlewares/errorHandlerMiddleware.js");

// routers
const authRouter = require("./routes/authRoutes.js");
const recipesRouter = require("./routes/recipesRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const categoriesRouter = require("./routes/categoriesRoutes.js");

app.use(helmet());
app.use(express.json());

app.get("/api/v1/test", (_req, res) => {
  res.status(200).json({ message: `Hello world` });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use(notFound);
app.use(errorHandler);

const port = 8888;
app.listen(port, () => console.log(`Server is listening on ${port}...`));
