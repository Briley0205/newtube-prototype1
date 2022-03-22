import express from "express";
import { getEdit, postEdit, getOut, see, logout, startGithubLogin, finishGithubLogin, startKakaoLogin, finishKakaoLogin, startGoogleLogin, finishGoogleLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/delete", getOut);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);

userRouter.get("/google/start", startGoogleLogin);
userRouter.get("/google/finish", finishGoogleLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;