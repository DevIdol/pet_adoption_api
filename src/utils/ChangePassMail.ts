import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { NextFunction, Response } from "express";
import { createError } from "./CreateError";

export const SendMail = async (
  email: string,
  url: string,
  res: Response,
  next: NextFunction
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: String(process.env.HOST),
      service: String(process.env.SERVICE),
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: String(process.env.MAIL_CHANGE),
        pass: String(process.env.MAIL_CHANGEPASS),
      },
    });
    const handlebarOptions: any = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.join(__dirname, "../../src/views"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../../src/views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: `Pet Adobtion 🐕 <${process.env.MAIL_CHANGE}>`,
      to: email,
      subject: "Password Reset Link",
      template: "changepass",
      context: {
        title: "Password Reset Link",
        text: url,
      },
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res.status(200).json({
      success: true,
      message: "Please Check your email to change password!",
    });
  } catch (error) {
    console.log(`Email couldn't sent!`);
    next(createError(401, "Email Limit Filled. Please wait 24 hours"));
  }
};
