const fakeUser = {
    username:"Boyeon",
    loggedIn: false,
}

export const trending = (req, res) => {
    const videos = [
        {title: "I",
         rating: 4.8,
         comments: 378,
         createdAt: "2 minutes ago",
         views: 78,
         id: 1,},
         {title: "hate",
         rating: 4.8,
         comments: 378,
         createdAt: "2 minutes ago",
         views: 78,
         id: 1,},
         {title: "medicines",
         rating: 4.8,
         comments: 378,
         createdAt: "2 minutes ago",
         views: 78,
         id: 1,},
    ];
    return res.render("home", {pageTitle: "Home", fakeUser, videos})};
export const Watch = (req, res) => res.render("watch", {pageTitle: "watch"});
export const Edit = (req, res) => res.render("edit", {pageTitle: "Edit videos"});
export const search = (req, res) => res.send("You can search your videos");
export const upload = (req, res) => res.send("You can upload your videos here");
export const deleteVideo = (req, res) => res.send("You may delete your videos");

