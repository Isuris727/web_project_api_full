import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ValidationError } from "../errors/errors.js";

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

async function getUserById(req, res) {
  const { id } = req.params;

  const foundUser = await User.findById(id);

  if (foundUser !== null) {
    return res.send(foundUser);
  }
  return res.status(404).send({ message: "ID de usuario no encontrado" });
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
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
