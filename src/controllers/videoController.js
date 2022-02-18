export const trending = (req, res) => res.render("home");
export const Watch = (req, res) => res.render("watch");
export const Edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("You can search your videos");
export const upload = (req, res) => res.send("You can upload your videos here");
export const deleteVideo = (req, res) => res.send("You may delete your videos");

