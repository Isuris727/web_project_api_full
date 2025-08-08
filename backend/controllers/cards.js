import Card from "../models/Card.js";

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    res.send(newCard);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((cardId) =>
      res.send({
        message: `Carta ${cardId.name} con ID: ${cardId._id} eliminada correctamente`,
      })
    )
    .catch((err) => next());
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
  } catch (err) {
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
    );
    res.send(dislikedCard);
  } catch (err) {
    next();
  }
}

export { getCards, createCard, deleteCard, likeCard, dislikeCard };
