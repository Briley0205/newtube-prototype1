import video from "../models/video";

const fakeUser = {
    username:"Boyeon",
    loggedIn: true,
}

/*callback way
video.find({}, (error, videoDocuments) => {
    if(error) {
        return res.render("server-error");
    }
    return res.render("home", { pageTitle: "home", videos: [], fakeUser })
});
*/
export const trending = async(req, res) => {
    try {
        const videos = await video.find({});
        console.log(videos);
        return res.render("home", { pageTitle: "home", videos, fakeUser });
    } catch{
        return res.render("server-error");
    }
};
export const Watch = async(req, res) => {
    const { id } = req.params;
    const videos = await video.findById(id);
    console.log(videos);
    return res.render("watch", {pageTitle: `Watching ${videos.title}`, videos, fakeUser})
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle: `editting`, fakeUser})
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
}
export const search = (req, res) => res.send("You can search your videos");
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload video", fakeUser });
};
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try{    
        await video.create({
        title,
        description,
        //createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
} catch(error) {
    console.log(error);
    return res.render("upload", 
    { pageTitle: "Upload video", 
    fakeUser, 
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
export const deleteVideo = (req, res) => res.send("You may delete your videos");

