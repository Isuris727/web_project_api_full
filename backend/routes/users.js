import express from "express";
import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/users.js";

const { Router } = express;

const routes = Router();

routes.get("/", getUsers);

routes.get("/:id", getUserById);

routes.patch("/me", updateUserProfile);

routes.patch("/me/avatar", updateUserAvatar);

export default routes;
