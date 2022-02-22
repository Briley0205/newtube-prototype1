const fakeUser = {
    username:"Boyeon",
    loggedIn: true,
}
let videos = [
    {title: "I",
     rating: 4.8,
     comments: 378,
     createdAt: "2 minutes ago",
     views: 8,
     id: 1,},
     {title: "hate",
     rating: 4.8,
     comments: 378,
     createdAt: "2 minutes ago",
     views: 78,
     id: 2,},
     {title: "medicines",
     rating: 4.8,
     comments: 378,
     createdAt: "2 minutes ago",
     views: 78,
     id: 3,},
]
export const trending = (req, res) => res.render("home", {pageTitle: "Home", fakeUser, videos});
export const Watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", {pageTitle: `Watching ${video.title}`, fakeUser, video})
};
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", {pageTitle: `editting ${video.title}`, fakeUser, video})
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}
export const search = (req, res) => res.send("You can search your videos");
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload video", fakeUser });
};
export const postUpload = (req, res) => {
    const {title } = req.body;
    const newVideo = {
     title,
     rating: 0,
     comments: 0,
     createdAt: "just now",
     views: 0,
     id: videos.length + 1,
    }
    console.log(req.body);
    videos.push(newVideo);
    return res.redirect("/");
}
export const deleteVideo = (req, res) => res.send("You may delete your videos");

