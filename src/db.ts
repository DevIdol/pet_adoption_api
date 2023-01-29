import mongoose from "mongoose";
import { logger } from "./logger/Logger";

const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.MONGODB || "")
        .then(() => logger.info("MongoDB Connected!"))
        .catch((error) => logger.error(`Couldn't connect to MongoDB!`, error));
};

export default connectDB;
