import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logger } from "./logger/Logger";
import path from "path";
import * as swaggerUI from "swagger-ui-express";
import * as YAML from "yamljs";
import connectDB from "./db";
import { ErrorHandler } from "./middlewares/ErrorHandler";
import authRoute from "./routes/AuthRoute";
import "./config/Passport";
import userRoute from "./routes/UserRoute";
import passport from "passport";
import favoriteRoute from "./routes/FavoriteRoute";
import resetPassRoute from "./routes/ResetPassRoute";
import adoptionRoute from "./routes/AdoptionRoute";
import adminRoute from "./routes/AdminRoute";
import PetRoute from "./routes/PetRoute";
import DonationRoute from "./routes/DonationRoute";
import ArticleRoute from "./routes/ArticleRoute";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 8080;

const swaggerPath = path.join(__dirname, "../swagger/app.yaml");
const swaggerDocument = YAML.load(swaggerPath);

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

//db
connectDB();

//swagger api
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//auth route api
app.use("/api/auth", authRoute);

//users route api
app.use("/api/users", userRoute);

//forgot password route api
app.use("/api/forgot-password", resetPassRoute);

//pet route api
app.use("/api", PetRoute);

//favorites route api
app.use("/api/favorites", favoriteRoute);

//adoptions route api
app.use("/api/adoptions", adoptionRoute);

//donation route api
app.use("/api/", DonationRoute);

//article route
app.use("/api/", ArticleRoute);

//admin route
app.use("/api/admin", adminRoute);

// error handler
app.use(ErrorHandler);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
