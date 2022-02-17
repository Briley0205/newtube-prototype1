import express from "express";
import {Watch, Edit, deleteVideo, upload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", Watch);
videoRouter.get("/:id(\\d+)/edit", Edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);


export default videoRouter;