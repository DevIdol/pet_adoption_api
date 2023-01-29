import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { createError } from "../utils/CreateError";

const isVerified = passport.authenticate("jwt", { session: false });

export const isUser = (req: any, res: any, next: NextFunction) => {
    let token = req.cookies.access_token;
    if (token) {
        isVerified(req, res, () => {
            if (req.user._id || req.user.isAdmin) {
                return next();
            } else {
                return next(createError(401, "It's not your account."));
            }
        });
    } else {
        return next(createError(401, "You are not authorized"));
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    if (token) {
        isVerified(req, res, () => {
            let user: any = req.user;
            if (user.isAdmin) {
                return next();
            } else {
                return next(createError(401, "You are not admin."));
            }
        });
    } else {
        return next(createError(401, "You are not authorized."));
    }
};
