import jwt from "jsonwebtoken";
import { AuthError } from "../errors/index.js";

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("no hay autorización");
    throw new AuthError("se requiere autorización");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, "secret-key"); // cambiar
  } catch (error) {
    console.log("no pasó la verificación");
    if (error instanceof AuthError) {
      return res.status(401).send({ message: error.message });
    }
    console.error("Error inesperado en la función validateToken:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }

  req.user = payload;

  next();
}

export { validateToken };
