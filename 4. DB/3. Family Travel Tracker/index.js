import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "regulus25",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUser() {
  const result = await db.query('SELECT * FROM users');
  users = result.rows;
  let user = users.find((data) => data.id == currentUserId);
  return user;
}

app.get("/", async (req, res) => {
  const user = await getUser();
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.code;
    try {
      await db.query(
        "INSERT INTO visited_countries (user_id, country_code) VALUES ($1, $2)",
        [currentUserId, countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const user = await getUser();
      const countries = await checkVisisted();
      res.render("index.ejs", {
        error: "Duplicate country value, Please add another country",
        countries: countries,
        total: countries.length,
        users: users,
        color: user.color,
      });
    }
  } catch (err) {
    console.log(err);
    const user = await getUser();
    const countries = await checkVisisted();
    res.render("index.ejs", {
      error: "Cannot find country, please try again",
      countries: countries,
      total: countries.length,
      users: users,
      color: user.color,
    });
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newUser = {
    name: req.body.name,
    color: req.body.color,
  }
  const result = await db.query(
    'INSERT INTO users(name, color) VALUES($1, $2) RETURNING *;',
    [newUser.name, newUser.color]
  );
  // console.log(result.rows);
  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
