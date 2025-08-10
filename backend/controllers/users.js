import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ValidationError, NotFoundError } from "../errors/index.js";

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos." });
  }

  try {
    const userToValidate = await User.findOne({ email });

    if (!userToValidate) {
      throw new ValidationError("Email o contraseña incorrectos.");
    }

    const passwordIsMatch = await bcrypt.compare(
      password,
      userToValidate.password
    );

    if (!passwordIsMatch) {
      throw new ValidationError("Email o contraseña incorrectos.");
    }

    const token = jwt.sign({ _id: userToValidate._id }, "secret-key", {
      // cambiar
      expiresIn: "7d",
    });

    res.status(202).json({ token });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(401).json({ message: error.message });
    }
    console.error("Error inesperado en la función de login:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }
}

async function createUser(req, res) {
  const { name, about, avatar, email, password } = req.body;
  const rounds = 11;
  const hashedPasswrd = await bcrypt.hash(password, rounds);
  const user = await User.create({
    name,
    about,
    avatar,
    email,
    password: hashedPasswrd,
  });
  // res.send(user._id);
  res.status(201).json({ message: "¡Correcto! ya estás registrado." });
}

async function getUsers(req, res) {
  const users = await User.find({});

  res.send(users);
}

async function getCurrentUser(req, res) {
  try {
    const { _id } = req.user;

    const currentUser = await User.findById(_id);

    if (currentUser === null) {
      throw new NotFoundError("Error al encontrar al usuario");
    }

    return res.send(currentUser);
  } catch {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error inesperado en la función getCurrentUser:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }
}

async function getUserById(req, res) {
  try {
    console.log("getUserById function");
    const { id } = req.params;

    const foundUser = await User.findById(id);

    if (foundUser === null) {
      throw new NotFoundError("Usuario no encontrado");
    }

    return res.send(foundUser);
  } catch {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error inesperado en la función getUserById:", error);
    res.status(500).json({ message: "Ocurrió un error en el servidor." });
  }
}

async function updateUserProfile(req, res, next) {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true }
    );

    res.send({ message: "usuario actualizado correctamente", updatedUser });
  } catch (err) {
    next();
  }
}

async function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  try {
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true, runValidators: true }
    );
    res.send({
      message: `Se actualizó el avatar. Nuevo link de avatar: ${updatedUserAvatar.avatar}`,
    });
  } catch (err) {
    next();
  }
}

export {
  login,
  createUser,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
