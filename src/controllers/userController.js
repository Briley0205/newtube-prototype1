
export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" })
export const postJoin = (req, res) => {
    console.log(req.body);
    res.end();
};

export const edit = (req, res) => res.send("You can edit your profiles");
export const getOut = (req, res) => res.send("You can delete your account.");
export const login = (req, res) => res.send("You can login here");
export const logout = (req, res) => res.send("You can log out");
export const see = (req, res) => res.send("You can see you here");

