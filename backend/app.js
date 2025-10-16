import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import { validateToken } from "./middlewares/auth.js";
import { login, createUser } from "./controllers/users.js";

const app = express();

const { PORT = 3000 } = process.env;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`App escuchando en el puerto ${PORT}`);
  });
}

mongoose
  .connect("mongodb://127.0.0.1:27017/aroundbd")
  .then(() => console.log("conectado a la base de datos"))
  .catch((err) => console.error(err));

app.use(express.json());

app.post("/signup", createUser);

app.post("/signin", login);

app.use(validateToken);

app.use("/users", usersRoutes);

app.use("/cards", cardsRoutes);

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
  console.error(err);
});

app.use("/", function (req, res) {
  res.status(500).send({ message: "Recurso solicitado no encontrado" });
});

app.use((error, req, res, next) => {
  if (error instanceof AuthError) {
    return res.status(401).send({ message: error.message });
  }

  if (error instanceof ValidationError) {
    return res.status(401).json({ message: error.message });
  }

  if (error.name === "CastError") {
    console.error(err);
    return res
      .status(400)
      .send({ message: "Por favor introduce unos datos validos." });
  }

  if (error.name === "DocumentNotFoundError") {
    console.error(err);
    return res.status(404).send({
      message:
        "No se encontró el documento solicitado. Por favor verifica tu información",
    });
  }
  res.status(500).send({
    message: "Algo salió mal",
  });
});

export default app;
