import express from "express";
import { celebrate, Joi } from "celebrate";

import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";
import { validateUrl } from "../utils/utils.js";
const { Router } = express;

const routes = Router();

routes.get("/", getCards);

routes.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),

      link: Joi.string().required().custom(validateUrl),
    }),
  }),
  createCard
);

routes.delete(
  "/:cardId",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard
);

routes.put(
  "/:cardId/likes",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  likeCard
);

routes.delete(
  "/:cardId/likes",
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  dislikeCard
);

export default routes;
