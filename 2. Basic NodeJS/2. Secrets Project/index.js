//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from "body-parser";
import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
var isAuthorized = false;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    if(req.body["password"] === "ILoveProgramming") isAuthorized = true;
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(isAuthorized === true) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log("Sever listening in port 3000");
});




