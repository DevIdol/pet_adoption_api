import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      requierd: true,
    },
    size: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Pet", petSchema);
