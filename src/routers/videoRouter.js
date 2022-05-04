import express from "express";
import { protectMiddleware } from "../middleware";
import {Watch, getEdit, postEdit, deleteVideo, getUpload, postUpload} from "../controllers/videoController";
import { videoUpload } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", Watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectMiddleware).get(getUpload).post(videoUpload.fields([
    { name: "video", maxCount: 1 }, { name: "thumb", maxCount: 1 }
]), postUpload);
//.single() takes only one file, .fields() several fields that the user want to take as.

export default videoRouter;