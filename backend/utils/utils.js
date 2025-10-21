// mover validateUrl y exportarlo a routes/card y routes/user
import validator from "validator";
const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

export { validateUrl };
