import { NextFunction, Request, Response } from "express";
import {
    loginService,
    logoutService,
    registerService,
} from "../services/AuthService";

//register
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    registerService(req, res, next);
};

//login
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    loginService(req, res, next);
};

//logout
export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logoutService(req, res, next);
};
