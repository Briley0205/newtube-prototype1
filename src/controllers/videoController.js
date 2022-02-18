export const trending = (req, res) => res.render("home", {pageTitle: "Home"});
export const Watch = (req, res) => res.render("watch", {pageTitle: "watch"});
export const Edit = (req, res) => res.render("edit", {pageTitle: "Edit videos"});
export const search = (req, res) => res.send("You can search your videos");
export const upload = (req, res) => res.send("You can upload your videos here");
export const deleteVideo = (req, res) => res.send("You may delete your videos");

