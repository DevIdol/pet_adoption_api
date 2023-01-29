import { Types } from "mongoose";
export interface CreateToken {
  userId?: Types.ObjectId;
  token?: String;
}
