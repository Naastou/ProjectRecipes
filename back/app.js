require("express-async-errors");
require("dotenv").config();
const helmet = require("helmet");
const { validateTest } = require("./middlewares/validationMiddleware.js");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// middlewares
const notFound = require("./middlewares/notFoundMiddleware.js");
const errorHandler = require("./middlewares/errorHandlerMiddleware.js");

// routers
const authRouter = require("./routes/authRoutes.js");
const recipesRouter = require("./routes/recipesRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use(helmet());
app.use(express.json());

app.get("/api/v1/test", (_req, res) => {
  res.status(200).json({ message: `Hello world` });
});

// test express validator
app.post("/api/v1/test", validateTest, (req, res) => {
  const { name } = req.body;
  res.status(200).json({ message: `Salut ${name}` });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const port = 5000;
app.listen(port, () => console.log(`Server is listening on ${port}...`));
