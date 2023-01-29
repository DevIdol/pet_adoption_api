import { Request } from "express";
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import User from "../models/UserModel";
import { createError } from "../utils/CreateError";

const localStrategy = passportLocal.Strategy;
const JWTstrategy = passportJWT.Strategy;
passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user: any = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "Invalid email or password." });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: "Invalid email or password." });
                }

                return done(null, user, { message: "Logged in Successfully." });
            } catch (error: any) {
                return done(createError(500, "Internal Server Error."));
            }
        }
    )
);

const cookieExtractor = (req: Request) => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies["access_token"];
    }

    return jwt;
};
passport.use(
    new JWTstrategy(
        {
            secretOrKey: String(process.env.SECRET_KEY),
            jwtFromRequest: cookieExtractor,
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error: any) {
                done(createError(401, "You are not authorized!"));
            }
        }
    )
);
