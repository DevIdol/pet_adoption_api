import { Schema, model } from "mongoose";
import { AdoptionInterface } from "../interfaces/AdoptionInterface";
const AdoptionRegister = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<AdoptionInterface>("Adoption", AdoptionRegister);
