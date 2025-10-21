import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const urlRegex =
          /https?:\/\/[w{3}.]?[\w|\W|\d]+[\.com|.net|.mx]\/?.{1,}/;

        return urlRegex.test(value);
      },
      message: (props) =>
        `${props.value} no es una URL, por favor usa una URL válida`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("card", cardSchema);

export default Card;
