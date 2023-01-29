import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { NextFunction } from "express";
import { createError } from "./CreateError";

export const VerifyEmail = async (
  email: any,
  url: any,
  next: NextFunction
) => {
  try {
    var transporter = nodemailer.createTransport({
      host: String(process.env.HOST),
      service: String(process.env.SERVICE),
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: String(process.env.MAIL_CENTER),
        pass: String(process.env.MAIL_PASS),
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
      from: `Pet Adobtion 🐕 <${process.env.MAIL_CENTER}>`,
      to: email,
      subject: "Verify your email address",
      template: "verify-email",
      context: {
        title: "Pet Adoption Account",
        text: url,
      },
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log(`Email couldn't sent!`);
    next(createError(401, "Email Limit Filled. Please wait 24 hours and login again"));
  }
};
