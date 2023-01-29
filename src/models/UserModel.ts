import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { CreateUser } from "../interfaces/UserInterface";

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
  adoptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adoption",
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.isValidPassword = async function (password: any) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export default model<CreateUser>("User", UserSchema);
