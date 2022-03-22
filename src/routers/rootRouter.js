import express from "express";
import {trending, search} from "../controllers/videoController";
import {getJoin, postJoin, getLogin, postLogin} from "../controllers/userController";
import { publicOnlyMiddelware } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", trending);
rootRouter.route("/join").all(publicOnlyMiddelware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddelware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;