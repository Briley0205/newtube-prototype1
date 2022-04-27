import mongoose from "mongoose";
//.trim() removes spaces between words.

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 80 },
    fileUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: {type:Date, required: true, default: Date.now},
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
})
//ref : to tell mongoose I'm going to save an id to the owner too.

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})

const movieModel = mongoose.model("video", videoSchema);
export default movieModel;