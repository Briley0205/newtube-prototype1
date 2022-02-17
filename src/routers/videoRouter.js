import express from "express";
import {Watch, Edit} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/watch", Watch);
videoRouter.get("/edit", Edit);

export default videoRouter;