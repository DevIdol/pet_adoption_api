import { Schema, model } from "mongoose";
import { CreateFavorite } from "../interfaces/FavoriteInterface";

const FavoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pets: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
  },
  { timestamps: true }
);

export default model<CreateFavorite>("Favorite", FavoriteSchema);
