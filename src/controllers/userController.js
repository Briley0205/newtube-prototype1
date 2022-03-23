import User from "../models/User";
import bcrypt from "bcrypt";
/**Use fetch to get some objects from other servers */
import fetch from "node-fetch";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" })
export const postJoin = async(req, res) => {
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "join";
    if(password !== password2){
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage: "Password confirmation does not match.", });
    };
    // $or operator = 각 조건이 true일때 실행
    const exists = await User.exists({$or: [{username}, {email}]});
    if(exists){
        return res.status(400).render("join", { 
            pageTitle, 
            errorMessage:"This username/email is already taken." });
    }
    try {
    await User.create({
        name, username, email, password, location, avatarUrl: "",
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
    const userExists = await User.findOne({username, socialOnly: false });
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
    }
    req.session.loggedIn = true;
    req.session.user = userExists;
    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "http://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        scope: "read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
    //it will take you to go "Authorization callback URL which you had set before 'https://github.com/settings/applications/1857461'"
}
export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await(
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        })
    ).json();
    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        const emailObj = emailData.find(email => email.primary === true && email.verified === true);
        if(!emailObj){
            //set notification
            res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if(!user){
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.login,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                //location: userData.location,
            });
        }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
        return res.redirect("/login");
    } 
}
export const startKakaoLogin = (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
        client_id: process.env.KAKAO_CLIENT,
        redirect_uri: "http://localhost:4000/users/kakao/finish",
        response_type: "code",
        scope: "profile_nickname profile_image account_email"
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}
export const finishKakaoLogin = async(req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
        client_id: process.env.KAKAO_CLIENT,
        client_secret: process.env.KAKAO_SECRET,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:4000/users/kakao/finish",
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await(
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            }
        })
    ).json();
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://kapi.kakao.com";
        const userData = await (await fetch(`${apiUrl}/v2/user/me`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).json();
        const USER_KEY = userData.kakao_account;
        if(USER_KEY.is_email_valid === false || USER_KEY.is_email_verified === false) {
            //set notification
            res.redirect("/login");
        }
        let user = await User.findOne({ email: USER_KEY.email });
        if(!user){
            user = await User.create({
                avatarUrl: USER_KEY.profile.profile_image,
                name: USER_KEY.profile.nickname,
                username: USER_KEY.profile.nickname,
                email: USER_KEY.email,
                password: "",
                socialOnly: true,
            });
        }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
}

export const startGoogleLogin = (req, res) => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const config = {
        client_id: process.env.GG_CLIENT,
        redirect_uri: "http://localhost:4000/users/google/finish",
        response_type: "code",
        include_granted_scopes: true,
        scope: ["https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"].join(" "),
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}
export const finishGoogleLogin = async(req, res) => {
    const baseUrl = "https://oauth2.googleapis.com/token";
    const config = {
        client_id: process.env.GG_CLIENT,
        client_secret: process.env.GG_SECRET,
        redirect_uri: "http://localhost:4000/users/google/finish",
        include_granted_scopes: true,
        grant_type: "authorization_code",
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await(
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            }
        })
    ).json();
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://www.googleapis.com"
        const userData = await (await fetch(`${apiUrl}/oauth2/v1/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).json();
        if(userData.verified_email === false) {
            //set notification
            res.redirect("/login");
        }
        let user = await User.findOne({ email: userData.email });
        if(!user){
            user = await User.create({
                avatarUrl: userData.picture,
                name: userData.name,
                username: userData.name,
                email: userData.email,
                password: "",
                socialOnly: true,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
}

/**
 *  export const startTwitterLogin = (req, res) => {
    const baseUrl = "https://api.twitter.com"
}
 */

export const getEdit = (req, res) => {
    return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async(req, res) => {
    const {
        session: {
            user: { _id, avatarUrl },
        },
        body: { email, name, username },
        file,
    } = req;
    const updatedUser = await User.findByIdAndUpdate(_id, {
        //object: objectExist ? true :false
        avatarUrl: file ? file.path :avatarUrl,
        email, 
        name, 
        username,
    },
    { new: true }
    );
    req.session.user = updatedUser;
    /**
    let changeInfoParam = [];
    if(sessionEmail !== email) {
        changeInfoParam.push({ email });
        console.log(changeInfoParam);
    }
    if(sessionUsername !== username) {
        changeInfoParam.push({ username });
        console.log(changeInfoParam);
    }
    if(changeInfoParam.length > 0) {
        console.log("I'm here!")
        const existingUser = await User.findOne({ $or: changeInfoParam });
        console.log(existingUser);
        if(existingUser && existingUser._id.toString() !== _id) {
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
                errorMessage: "This name/email is already taken",
            });
        }
    }
    if(sessionName !== name) {
        changeInfoParam.push({ name });
        console.log(changeInfoParam.name);
    }
 */
    /** update session
    req.session.user = {
        ...req.session.user,
        email, 
        name, 
        username,
    }
 */
    return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
    if(req.session.user.socialOnly === true){
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "Change Password" });
}
export const postChangePassword = async(req, res) => {
    const {
        session: {
            user: { _id, password },
        },
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    const oldPasswordOK = await bcrypt.compare(oldPassword, password);
    if(!oldPasswordOK) {
        return res.status(400).render("users/change-password", { pageTitle: "Change Password", errorMessage: "The old password is incorrect" });
    }
    if(oldPassword === newPassword) {
        return res.status(400).render("users/change-password", { pageTitle: "Change Password", errorMessage: "You have already used this password before." });
    }
    if(newPassword !== newPassword1) {
        return res.status(400).render("users/change-password", { pageTitle: "Change Password", errorMessage: "The new password does not match the confirmation" });
    }
    const user = await User.findById(_id)
    user.password = newPassword
    await user.save();
    req.session.user.password = user.password
    // send notification
    return res.redirect("/users/logout");
}

export const getOut = (req, res) => res.send("You can delete your account.");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const see = (req, res) => res.send("You can see you here");
