import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("I'm still watching you.");
}

const handleLogin = (req, res) => {
    return res.send("login here.")
}
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleServerListening = () => console.log("Server is listening. I'm ready");

app.listen(PORT, handleServerListening);