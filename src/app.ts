import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

// modules, helpers, configs and other custom files imports
import { logger } from "./configs/logger";
import { db } from "./models";
import { UserController } from "./routes/user";

// application variables and constants
const app: Application = express();
const { port } = process.env;

//express configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// aplication level global error handler middleware
const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`------ Express request handler error: ${err} ---------- `);
  res.status(500).json({ message: "Application server error" });
};

// attach error middleware to express object
app.use(errorHandlerMiddleware);

// controller attachment to the app object
app.use("/users", UserController);

// application function runner before context post construct called
(async function () {
  await db.db_connection.authenticate();
  logger.info(
    `------------ Database connection established successfully -------------`
  );
  await db.db_connection.sync({ alter: true });
  logger.info(
    `------ Table DDL queries executed successfully ----------------`
  );
})();
//app attachment to http/https port
app.listen(port, () => logger.info(`Application is listening on port ${port}`));
