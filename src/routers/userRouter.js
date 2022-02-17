import express from "express";
import { edit, getOut, see, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", getOut);
userRouter.get(":id", see);
userRouter.get("logout", logout);

export default userRouter;