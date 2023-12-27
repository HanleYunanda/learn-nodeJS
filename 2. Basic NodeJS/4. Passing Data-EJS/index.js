import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    let fName = req.body["fName"];
    let lName = req.body["lName"];
    let fullName = fName + lName;
    let lenName = fullName.length;
    res.render("index.ejs", {len: lenName});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});