import User from "../models/User";
import bcrypt from "bcrypt";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" })
export const postJoin = async(req, res) => {
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "join";
    if(password !== password2){
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "Password confirmation does not match.", });
    };
    const exists = await User.exists({$or: [{username}, {email}]});
    if(exists){
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage:"This username/email is already taken." });
    }
    try {
    await User.create({
        name, username, email, password, location,
    });
    return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", 
        { pageTitle,  
        errorMessage: error._message});    
    }
};

export const getLogin = (req, res) => {res.render("login", {pageTitle: "Login"})};
export const postLogin = async(req, res) => {
    const {username, password} = req.body;
    const pageTitle = "Login";
    const userExists = await User.findOne({username});
    if(!userExists){
        return res.status(400).render("login", 
        {pageTitle, 
        errorMessage: "An account with this username does not exists."});
    }
    const passwordOk = await bcrypt.compare(password, userExists.password);
    if(!passwordOk){
        return res.status(400).render("login", 
        {pageTitle, 
        errorMessage: "Wrong password.",});
    };
//    return res.redirect("/")
};

export const edit = (req, res) => res.send("You can edit your profiles");
export const getOut = (req, res) => res.send("You can delete your account.");
export const logout = (req, res) => res.send("You can log out");
export const see = (req, res) => res.send("You can see you here");

