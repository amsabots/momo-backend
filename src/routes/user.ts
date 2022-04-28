import express from "express";
import { db } from "../models";
import { AbstractDataEntity, SystemUser } from "../types/data";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.user.findAll();
  return res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await db.user.findOne({ where: { id: req.params.id } });
  res.send(user);
});
router.post("/", async (req, res) => {
  const { email, name, pass_reset, password, set_password } =
    req.body as SystemUser;
  const user = await db.user.create({ ...req.body, set_password: true });
  res.send(user);
});
export { router as UserController };
