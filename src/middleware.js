/**Import file uploader(&saver) */
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddelware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    } else {
        return res.redirect("/");
    }
}

export const uploadFilesMiddleware = multer({ dest:"uploads/" });
//req.file is 'avatar' file