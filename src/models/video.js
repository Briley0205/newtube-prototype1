import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    creatdeAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    }
})

const movieModel = mongoose.model("video", videoSchema);
export default movieModel;