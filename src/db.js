/**Bridge which connects between node.js and mongoDB */
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");

db.on("error", (error) => console.log("DB Error", error));
db.once("open", handleOpen);

//animation db
import axios from "axios";
import fetch from "node-fetch";
import res from "express/lib/response";

const anilist  = require('anilist-node');
const Anilist = new anilist();
/**Anilist.media.anime(132405).then(data => {
    console.log(data);
})
Anilist.media.anime(21708).then(data => {
    console.log(data);
}); */
