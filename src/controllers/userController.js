import User from "../models/User";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" })
export const postJoin = async(req, res) => {
    const {name, username, email, password, location} = req.body;
    await User.create({
        name, username, email, password, location,
    });
    return res.redirect("/login");
};

export const edit = (req, res) => res.send("You can edit your profiles");
export const getOut = (req, res) => res.send("You can delete your account.");
export const login = (req, res) => res.send("You can login here");
export const logout = (req, res) => res.send("You can log out");
export const see = (req, res) => res.send("You can see you here");

