import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/UserModel";
import { VerifyEmail } from "../utils/VerifyEmail";
import bcrypt from "bcrypt";
import { createError } from "../utils/CreateError";
import Token from "../models/Token";

//register service
export const registerService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { username, email, password } = req.body;
    try {
        let user: any = await User.findOne({ email });
        if (user) {
            return next(createError(401, "Email already exists!"));
        }
        if (!username) {
            return next(createError(400, "Username can't be empty!"));
        }
        if (!email) {
            return next(createError(400, "Email can't be empty!"));
        }
        if (!password) {
            return next(createError(400, "Password can't be empty!"));
        }
        if (password.length < 6) {
            return next(
                createError(400, "Password must be greater than 6 characters")
            );
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        user = await newUser.save();
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/api/users/${user._id}/verify/${token.token}`;

        await VerifyEmail(user.email, url, next);
        res.status(201).json({
            success: true,
            message: "Please check your email to login!",
            data: user,
        });
    } catch (error) {
        console.log(error);
        next(createError(500, "Internal Server Error!!"));
    }
};

//login service
export const loginService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            req.login(user, { session: false }, async (error) => {
                if (err || !user) {
                    return next(createError(400, info.message));
                }
                if (!user.verified) {
                    return next(
                        createError(
                            401,
                            "This email address is not verified. Please check your email to confirm."
                        )
                    );
                } else {
                    const body = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        profile: user.profile,
                        favorites: user.favorites,
                        adoptions: user.adoptions,
                        isAdmin: user.isAdmin,
                    };
                    const token = jwt.sign(
                        { user: body },
                        String(process.env.JWTSECRET_KEY),
                        {
                            expiresIn: "7d",
                        }
                    );
                    const expiryDate = new Date(Date.now() + 30 * 24 * 36000000);
                    return res
                        .cookie("access_token", token, {
                            expires: expiryDate,
                            httpOnly: true,
                        })
                        .status(200)
                        .json({
                            success: true,
                            message: info.message,
                            token,
                        });
                }
            });
        } catch (error: any) {
            next(createError(500, "Internal Server Error."));
        }
    })(req, res, next);
};

//logout service
export const logoutService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user: any = req.user;
        const isUser = user._id === req.params.userId;
        if (!isUser) {
            return next(createError(401, "It's not your account"));
        }
        res.clearCookie("access_token");
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error: any) {
        next(createError(500, "Internal Server Error."));
    }
};
