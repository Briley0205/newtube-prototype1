import express from "express";
import { getEdit, postEdit, getOut, see, logout, startGithubLogin, finishGithubLogin, startKakaoLogin, finishKakaoLogin, startGoogleLogin, finishGoogleLogin } from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddelware } from "../middleware";

const userRouter = express.Router();

userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", getOut);
userRouter.get("/logout", protectMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddelware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddelware, finishGithubLogin);

userRouter.get("/kakao/start", publicOnlyMiddelware, startKakaoLogin);
userRouter.get("/kakao/finish", publicOnlyMiddelware, finishKakaoLogin);

userRouter.get("/google/start", publicOnlyMiddelware, startGoogleLogin);
userRouter.get("/google/finish", publicOnlyMiddelware, finishGoogleLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;