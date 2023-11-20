import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import authSpotifyRouter from "./api/v1/authSpotifyRouter.js";
import venuesRouter from "./api/v1/venuesRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/auth/spotify", authSpotifyRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/venues", venuesRouter)
rootRouter.use("/", clientRouter);

//place your server-side routes here

export default rootRouter;
