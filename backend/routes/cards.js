import express from "express";
const { Router } = express;
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards.js";

const routes = Router();

routes.get("/", getCards);

routes.post("/", createCard);

routes.delete("/:cardId", deleteCard);

routes.put("/:cardId/likes", likeCard);

routes.delete("/:cardId/likes", dislikeCard);

export default routes;
