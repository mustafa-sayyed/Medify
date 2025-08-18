import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Routes
import userRouter from "./routes/user.route.js";
import errorHandler from "./middlewares/error.middleware.js";

app.use("/api/v1/users", userRouter);


app.use(errorHandler)

export default app;
