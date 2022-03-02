import video from "../models/video";

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
        const videos = await video.find({}).sort({createdAt: "desc"});
        return res.render("home", { pageTitle: "home", videos});
    } catch{
        return res.render("server-error");
    }
};
export const Watch = async(req, res) => {
    const { id } = req.params;
    const videos = await video.findById(id);
    if(videos === null){
        return res.render("404", {pageTitle: "Video not found"});
    };
    return res.render("watch", {pageTitle: `Watching ${videos.title}`, videos});
};

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const videos = await video.findById(id);
    if(!videos) {
        return res.render("404", {pageTitle: "Video not found"});
    }
    return res.render("edit", {pageTitle: `edit: ${videos.title}`, videos})
};
export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const videos = await video.exists({ _id:id });
    if(!videos) {
        return res.render("404", {pageTitle: "Video not found"});
    }
    await video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
}

export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword){
            videos = await video.find({
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
    const { title, description, hashtags } = req.body;
    try{    
        await video.create({
        title,
        description,
        //createdAt: Date.now(),
        hashtags: video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error) {
    console.log(error);
    return res.render("upload", 
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
    await video.findByIdAndDelete(id);
    return res.redirect("/");
};

