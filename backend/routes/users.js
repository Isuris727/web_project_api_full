import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/users.js";

const { Router } = express;

const routes = Router();

routes.get("/", getAllUsers);

routes.get("/me", getCurrentUser);

routes.get("/:id", getUserById);

routes.patch("/me", updateUserProfile);

routes.patch("/me/avatar", updateUserAvatar);

export default routes;
