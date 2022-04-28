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

// controller attachment to the app object
app.use("/users", UserController);

// attach error middleware to express object
app.use(function (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).send(error);
});
// handle any route that does not exists
app.use(function (req: Request, res: Response) {
  return res.status(404).send("The url path does not exist");
});

// application function runner before context post construct called
(async function () {
  await db.db_connection.authenticate();
  logger.info(
    `------------ Database connection established successfully -------------`
  );
  await db.db_connection.sync({ force: true });
  logger.info(
    `------ Table DDL queries executed successfully ----------------`
  );
})();
//app attachment to http/https port
app.listen(port, () => logger.info(`Application is listening on port ${port}`));
