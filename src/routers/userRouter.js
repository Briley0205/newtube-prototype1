import express from "express";
import { edit, getOut } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", getOut);

export default userRouter;