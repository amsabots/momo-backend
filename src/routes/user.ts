import express from "express";
import { db } from "../models";

const router = express.Router();

router.get("/", async (req, res) => {
  throw "some issues occured";
  //   const users = await db.user.findAll();
  //   return res.send(users);
});

export { router as UserController };
