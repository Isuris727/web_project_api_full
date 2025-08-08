import User from "../models/User.js";

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

async function createUser(req, res) {
  const { name, about, avatar } = req.body;
  const user = await User.create({
    name,
    about,
    avatar,
  });

  res.send(user);
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
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
