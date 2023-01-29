import { NextFunction, Request, Response } from "express";
import Token from "../models/Token";
import User from "../models/UserModel";
import crypto from "crypto";
import { SendMail } from "../utils/ChangePassMail";
import bcrypt from "bcrypt";
import { createError } from "../utils/CreateError";

//Forgot Password Send Mail
export const forgotPasswordService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user: any = await User.findOne({ email: req.body.email });
		if (!user) {
			return next(createError(404, "Invalid Email"));
		}
		if (!user.verified) {
			return next(
				createError(401, "Your email is not verified, Please check your email")
			);
		}
		let token = await Token.findOne({
			userId: user._id,
		});
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}
		const url = `${process.env.BASE_URL}/api/forgot-password/${user._id}/${token.token}`;
		await SendMail(user.email, url, res, next);
	} catch (error) {
		next(createError(500, "Internal Server Error"));
	}
};

//Get Password  Verify Url
export const passwordVerifyURLService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.params.userId;
		let user: any = await User.findOne({ _id: userId });
		if (!user) {
			return next(createError(404, "User Not Found"));
		}
		const token: any = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
			return next(createError(404, "Token Not Found"));
		}

		res.status(200).json({
			success: true,
			message: "Valid Password Reset URL",
			userId: token.userId,
			token: token.token,
		});
	} catch (error) {
		next(createError(500, "Internal Server Error"));
	}
};

//Password Reset(create new password)
export const resetPasswordService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { password } = req.body;
	try {
		const userId = req.params.userId;
		if (password.length < 6 || !password) {
			return next(
				createError(400, "Password should be at least 6 characters!")
			);
		}
		const user: any = await User.findOne({ _id: userId });
		if (!user) {
			return next(createError(404, "User Not Found"));
		}

		const token: any = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});

		if (!token) {
			return next(createError(400, "Invalid Token!"));
		}
		if (!user.verified) {
			return next(createError(400, "You are not allowed!"));
		}
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		password = await bcrypt.hash(password, salt);

		user.password = password;
		await user.save();
		await token.remove();

		res.status(200).json({
			success: true,
			message: "password reset successfully",
		});
	} catch (error) {
		res.render("not-found", { error: "Something Wrong!" });
	}
};
