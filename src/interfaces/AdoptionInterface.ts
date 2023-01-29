import { Types } from "mongoose";

export interface AdoptionInterface {
  userId?: Types.ObjectId;
  petId?: Types.ObjectId;
  desc?: String;
}
