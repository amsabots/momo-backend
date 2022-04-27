import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";

// modules, helpers, configs and other custom files imports
import { logger } from "./configs/logger";

// application variables and constants
const app: Application = express();
const { port } = process.env;

//express configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// application function runner before context post construct called

//app attachment to http/https port
app.listen(port, () => logger.info(`Application is listening on port ${port}`));
