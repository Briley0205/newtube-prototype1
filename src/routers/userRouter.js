import express from "express";
import { getEdit, postEdit, getOut, see, logout, startGithubLogin, finishGithubLogin, startKakaoLogin, finishKakaoLogin, startGoogleLogin, finishGoogleLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddelware, avatarUpload } from "../middleware";

const userRouter = express.Router();

userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectMiddleware).get(getChangePassword).post(postChangePassword);
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