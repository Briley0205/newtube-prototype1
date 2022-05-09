import express from "express";
import { createComment, deleteComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.get("/comments/:id([0-9a-f]{24})", deleteComment);

export default apiRouter;