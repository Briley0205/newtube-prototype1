import Video from "../models/video";
import Comment from "../models/Comment";
import User from "../models/User";

/*callback way
video.find({}, (error, videoDocuments) => {
    if(error) {
        return res.render("server-error");
    }
    return res.render("home", { pageTitle: "home", videos: []})
});
*/
export const trending = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({createdAt: "desc"});
        return res.render("home", { pageTitle: "home", videos});
    } catch{
        return res.render("server-error");
    }
};
export const Watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    console.log(video);
    if(video === null){
        return res.render("404", {pageTitle: "Video not found"});
    };
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video});
};
export const createComment = async(req, res) => {
    const { 
        session: { user },
        body: { text },
        params: { id },
    } = req;
    const currentUser = await User.findById(user._id);
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({ 
        text,
        owner: user._id,
        video: id,
        createdAt: new Date(Date.now()).toDateString(),
    });
    video.comments.push(comment._id);
    video.save();
    currentUser.comments.push(comment._id);
    currentUser.save();
    return res.sendStatus(201);
}

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const { user:{ _id } } = req.session;
    const videos = await Video.findById(id);
    if(!videos) {
        return res.status(400).render("404", {pageTitle: "Video not found"});
    }
    if(String(videos.owner) !== _id) {
        return res.status(403).redirect("/");
    }
    return res.render("edit", {pageTitle: `edit: ${videos.title}`, videos})
};
export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { user:{ _id } } = req.session;
    const { title, description, hashtags } = req.body;
    const videos = await Video.exists({ _id:id });
    if(!videos) {
        return res.status(400).render("404", {pageTitle: "Video not found"});
    }
    if(String(videos.owner) !== _id) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
}

export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword){
            videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        });
        return res.render("search", {pageTitle: "search", videos});
    }
    return res.render("search", {pageTitle: "search", videos});
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload video"});
};
export const postUpload = async (req, res) => {
    const { _id } = req.session.user;
    //const {variable:variableName} = req.file;
    console.log(req.files);
    const { video, thumb } = req.files;
    const { title, description, hashtags } = req.body;
    try{
        const newVideo = await Video.create({
        title,
        description,
        //createdAt: Date.now(),
        fileUrl: video[0].path,
        thumbUrl: thumb[0].path,
        owner: _id,
        //hashtags: video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch(error) {
        console.log(error);
    return res.status(400).render("upload", 
    { pageTitle: "Upload video",  
    errorMessage: error._message});
}
    //we need to wait after saving;;;

    /**another option
     * const videos = new video({
     * +objects
     * });
     * +await videos.save();
     */
};


export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    const { user:{ _id } } = req.session;
    const videos = await Video.findById(id);
    if(!videos) {
        return res.status(400).render("404", {pageTitle: "Video not found"});
    }
    if(String(videos.owner) !== _id) {
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

