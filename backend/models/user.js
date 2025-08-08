import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function isUrl(value) {
        const urlRegex =
          /https?:\/\/[w{3}.]?[\w|\W|\d]+[\.com|.net|.mx]\/?.{1,}/;

        return urlRegex.test(value);
      },
      message: (props) =>
        `${props.value} no es una url, por favor usa una url valida`,
    },
  },
});

const User = mongoose.model("user", userSchema);

export default User;
