import jwt from "jsonwebtoken";
import { AuthError } from "../errors/index.js";

function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AuthError("se requiere autorización");
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, "secret-key"); // cambiar
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).send({ message: error.message });
    }
    console.error("Error en al validar token:", error);
    if (error.message === "jwt expired") {
      return res.status(401).json({
        message: "El Token ha expirado, por favor vuelva a iniciar sesion",
        tokenStatus: "Expired",
      });
    }
    res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }

  req.user = payload;

  next();
}

export { validateToken };
