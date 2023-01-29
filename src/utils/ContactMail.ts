import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { Request, Response } from "express";

export const ContactMail = async (
  name: any,
  email: any,
  subject: any,
  message: any,
  req: Request,
  res: Response
) => {
  try {
    var transporter = nodemailer.createTransport({
      host: String(process.env.HOST),
      service: String(process.env.SERVICE),
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: String(process.env.MAIL_CONTACT),
        pass: String(process.env.MAIL_CONTACTPASS),
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
      from: `Pet Adobtion 🐕 <${email}>`,
      to: String(process.env.MAIL_CENTER),
      subject: subject,
      template: "contactmail",
      context: {
        name,
        email,
        message,
      },
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    req.flash("success", "Email Send Successful!");
    res.redirect("/");
  } catch (error) {
    console.log(`Email couldn't sent!`);
    req.flash(
      "error",
      "Email Limit Filled. Please wait 24 hours."
    );
    res.redirect("/");
  }
};
