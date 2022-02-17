import express from "express";
import {Watch, Edit, deleteVideo, upload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id", Watch);
videoRouter.get("/:id/edit", Edit);
videoRouter.get("/:id/edit", Edit);
videoRouter.get("/:id/delete", deleteVideo);
videoRouter.get("/:id/upload", upload);


export default videoRouter;