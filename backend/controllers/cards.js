import Card from "../models/Card.js";
import { AuthError, NotFoundError } from "../errors/index.js";

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
}

async function createCard(req, res, next) {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      throw new Error("Por favor introduce unos datos validos.");
    }

    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.send(newCard);
  } catch (error) {
    console.log("catch createCard");
    next(error);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const cardToDelete = await Card.findById(cardId);

    console.log("cardToDelete", cardToDelete);
    if (!cardToDelete) {
      throw new NotFoundError("Error al tratar de eliminar la carta");
    }

    if (!cardToDelete.owner.equals(_id)) {
      throw new AuthError("Usuario no autorizado");
    }

    Card.findByIdAndDelete(cardId).then((cardId) =>
      res.send({
        message: `Carta ${cardId.name} con ID: ${cardId._id} eliminada correctamente`,
      })
    );
  } catch (error) {
    console.log("catch deleteCard", error); // borrar
    (error) => next(error);
  }
}

async function likeCard(req, res, next) {
  try {
    const { cardId } = req.params;

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.send(likedCard);
  } catch (error) {
    next();
  }
}

async function dislikeCard(req, res, next) {
  try {
    const { cardId } = req.params;

    const dislikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
    res.send(dislikedCard);
  } catch (err) {
    next();
  }
}

export { getCards, createCard, deleteCard, likeCard, dislikeCard };
