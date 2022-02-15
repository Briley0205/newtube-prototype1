import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.send("<h1>I'm still watching you.</h1>");
}

const handleLogin = (req, res) => {
    return res.send("login here.")
}
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleServerListening = () => console.log("Server is listening. I'm ready");

app.listen(PORT, handleServerListening);