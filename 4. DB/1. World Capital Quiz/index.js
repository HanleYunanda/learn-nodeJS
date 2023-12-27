import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "regulus25",
    port: 5432
});

db.connect();

let quiz = [];

db.query("SELECT * FROM capitals", (err, res) => {
    if(err) {
        console.error("ERROR executing query", err.stack);
    } else {
        quiz = res.rows;
        // console.log(quiz);
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let currentQuestion = {};
let totalScore = 0;

app.get("/", (req, res) => {
    nextQuestion();
    res.render("index.ejs", {question: currentQuestion});
});

app.post("/submit", (req, res) => {
    let answer = req.body.answer.trim();
    let isCorrect = false;
    if(answer.toLowerCase() === currentQuestion.capital.toLowerCase()) {
        isCorrect = true;
        totalScore++;
    }
    nextQuestion();
    res.render("index.ejs", {
        question: currentQuestion,
        totalScore: totalScore,
        wasCorrect: isCorrect
    });
});

function nextQuestion() {
    currentQuestion = quiz[Math.floor(Math.random() * quiz.length)];
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});