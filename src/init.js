import "dotenv/config";
import "./db";
import "./animationDB";
import "./models/video";
import "./models/User";
import app from "./newserver";

const PORT = 4000;

const handleServerListening = () => console.log("Server is listening. I'm ready");

app.listen(PORT, handleServerListening);