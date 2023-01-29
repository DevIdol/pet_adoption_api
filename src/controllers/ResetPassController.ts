import { NextFunction, Request, Response } from "express";
import {
    forgotPasswordService,
    passwordVerifyURLService,
    resetPasswordService,
} from "../services/ResetPassService";

//Forgot Password Send Mail
export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    forgotPasswordService(req, res, next);
};

//Get Password  Verify Url
export const passwordVerifyURL = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passwordVerifyURLService(req, res, next);
};

//Password Reset(create new password)
export const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    resetPasswordService(req, res, next);
};
