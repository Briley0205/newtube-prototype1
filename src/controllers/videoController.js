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
        console.log("i started");
        const videos = await video.find({});
        console.log(videos);
        console.log("i finished");
        return res.render("home", { pageTitle: "home", videos: [], fakeUser });
    } catch{
        return res.render("server-error");
    }
};
export const Watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", {pageTitle: `Watching`, fakeUser})
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
export const postUpload = (req, res) => {
    const {title } = req.body;
    return res.redirect("/");
}
export const deleteVideo = (req, res) => res.send("You may delete your videos");

