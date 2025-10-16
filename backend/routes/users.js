import express from "express";
import { celebrate, Joi } from "celebrate";
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from "../controllers/users.js";
import { validateUrl } from "../utils/utils.js";

const { Router } = express;

const routes = Router();

routes.get("/", getAllUsers);

routes.get("/me", getCurrentUser);

routes.get(
  "/:id",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUserById
);

routes.patch(
  "/me",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
        "content-type": Joi.string().valid("application/json").required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      // validación de datos
    }),
  }),
  updateUserProfile
);

routes.patch(
  "/me/avatar",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
        "content-type": Joi.string().valid("application/json").required(),
      })
      .unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateUrl), // validación de url
    }),
  }),
  updateUserAvatar
);

export default routes;
