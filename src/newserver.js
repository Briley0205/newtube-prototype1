
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended:true }));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    //특정 방문자에게만 쿠키를 주고싶은 경우.
    resave: false,
    saveUninitialized: false,
    //모든 방문자에게 쿠키를 주고싶은 경우.
    //resave: true,
    //saveUninitialized: true

    //쿠키를 얼마나 유지하고 싶은지 직접 설정할 경우.(단위: ms);
    //cookie: { maxAge: 20000 },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));

//See all the people who casts request
/*app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});*/
app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/uploads", express.static("uploads"));

export default app

