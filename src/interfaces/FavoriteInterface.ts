import { Types } from "mongoose";

export interface CreateFavorite {
  userId?: Types.ObjectId;
  pets?: any;
}
