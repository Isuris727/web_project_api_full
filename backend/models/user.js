import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function isUrl(value) {
        const urlRegex =
          /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})$/;

        return urlRegex.test(value);
      },
      message: (props) =>
        `${props.value} no es una url, por favor usa una url valida`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: function isEmail(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailRegex.test(value);
      },
      message: (props) =>
        `${props.value} no es un email, por favor usa un email valido`,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
