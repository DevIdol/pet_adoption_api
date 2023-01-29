import express, { Router } from "express";
import {
  deleteUser,
  getUser,
  udpateUser,
  verifyEmail,
} from "../controllers/UserController";
import { isUser } from "../middlewares/isAuth";

const userRoute: Router = express.Router();

//Verify Email
userRoute.get("/:userId/verify/:token", verifyEmail);

//get user
userRoute.get("/:userId", isUser, getUser);

//update user
userRoute.put("/:userId", isUser, udpateUser);

//delete user
userRoute.post("/:userId", isUser, deleteUser);

export default userRoute;
