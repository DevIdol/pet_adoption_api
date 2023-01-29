import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/UserModel";
import Token from "../models/Token";
import { createError } from "../utils/CreateError";
import FavoriteModel from "../models/FavoriteModel";
import AdoptionModel from "../models/AdoptionModel";

//verify email
export const verifyEmailService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user: any = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return next(createError(404, "Email Not Found."));
        }

        const token: any = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) {
            return next(createError(404, "Token Not Found."));
        }

        await User.updateOne({ _id: user._id }, { $set: { verified: true } });
        await token.remove();

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });
    } catch (error) {
        next(createError(500, "Internal Server Error."));
    }
};

//get all users from admin
export const getAllUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//get user
export const getUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        const user = await User.findById(userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//update user
export const updateUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            data: updateUser,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//delete user
export const deleteUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const loginUser: any = req.user;
        if (userId !== loginUser._id) {
            return next(createError(401, "It's not your account"));
        }
        let { password } = req.body;
        let user: any = await User.findOne({ _id: userId });
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return next(createError(400, "Your password is wrong."));
        }
        await User.findByIdAndDelete(userId).populate(["favorites", "adoptions"]);
        await FavoriteModel.deleteMany({ userId });
        await AdoptionModel.deleteMany({ userId });
        res.clearCookie("access_token");
        res.status(200).json({
            success: true,
            message: "Deleted Successful",
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//delete user from admin
export const deleteUserAdminService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;

        const user: any = await User.findByIdAndDelete(userId).populate([
            "favorites",
            "adoptions",
        ]);
        await FavoriteModel.deleteMany({ userId: userId });
        await AdoptionModel.deleteMany({ userId: userId });
        if (!user) {
            return next(createError(404, "User Not Found"));
        }
        res.status(200).json({
            success: true,
            message: `Deleted ${user.username}`,
        });
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//approved user from admin
export const approvedUserService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const user: any = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User Not Found"));
        }
        const token: any = await Token.findOne({ userId });
        if (token) {
            await token.remove();
        }
        if (!user.verified) {
            await User.findByIdAndUpdate(userId, { $set: { verified: true } });
            res.status(200).json({
                success: true,
                message: `Verified ${user.username}`,
            });
        }
        if (user.verified) {
            await User.findByIdAndUpdate(userId, {
                $set: { verified: false },
            });
            res.status(200).json({
                success: true,
                message: `Unverified ${user.username}`,
            });
        }
    } catch (error) {
        next(createError(500, "Internal Server Error"));
    }
};

//approved to be Admin
export const approvedAdminService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.userId;
        const user: any = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User Not Found"));
        }
        if (!user.isAdmin) {
            await User.findByIdAndUpdate(userId, { $set: { isAdmin: true } });
            res.status(200).json({
                success: true,
                message: `Now ${user.username} is Admin`,
            });
        }
        if (user.isAdmin) {
            await User.findByIdAndUpdate(userId, {
                $set: { isAdmin: false },
            });
            res.status(200).json({
                success: true,
                message: `${user.username} is removed from admin team`,
            });
        }
    } catch (error) {
        next(createError(500, "Internal Server Error!!"));
    }
};
