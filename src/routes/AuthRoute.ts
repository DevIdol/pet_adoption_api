import express, { Router } from "express";
import { login, logout, register } from "../controllers/AuthController";
import { isUser } from "../middlewares/isAuth";

const authRoute: Router = express.Router();

//register
authRoute.post("/register", register);

//login
authRoute.post("/login", login);

//logout
authRoute.post("/logout/:userId", isUser, logout);

export default authRoute;
