import express from "express";
import {
  forgotPassword,
  passwordVerifyURL,
  resetPassword,
} from "../controllers/ResetPassController";
const resetPassRoute = express.Router();

//Forgot Password Send Mail
resetPassRoute.post("/", forgotPassword);

//Get Password Verify URL
resetPassRoute.get("/:userId/:token", passwordVerifyURL);

//Reset Password (create new password)
resetPassRoute.post("/:userId/:token", resetPassword);

export default resetPassRoute;
