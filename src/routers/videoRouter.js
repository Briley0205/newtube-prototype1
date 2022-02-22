import express from "express";
import {Watch, getEdit, postEdit, deleteVideo, getUpload, postUpload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", Watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);


export default videoRouter;