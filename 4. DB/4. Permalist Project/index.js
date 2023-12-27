import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "regulus25",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getData() {
  const data = await db.query('SELECT * FROM items');
  const res = data.rows;
  // console.log(res);
  return res;
}

app.get("/", async (req, res) => {
  items = await getData();
  // console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  db.query(
    'INSERT INTO items(title) VALUES($1)',
    [item]
  );
  // console.log(items);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemID = req.body.updatedItemId;
  const newTitle = req.body.updatedItemTitle;
  // console.log(itemID);
  // console.log(newTitle);
  try {
    const data = await db.query('SELECT * FROM items WHERE id = $1', [itemID]);
    if(data.rowCount > 0) {
      try {
        const newData = db.query(
          'UPDATE items SET title = $1 WHERE id = $2',
          [newTitle, data.rows[0].id]
        );
        res.redirect('/');
      } catch(err) {
        items = await getData();
        res.render("index.ejs", {
          listTitle: "Today",
          listItems: items,
          error: "ERROR! Can't update data"
        });
      }
    } else {
      items = await getData();
      res.render("index.ejs", {
        listTitle: "Today",
        listItems: items,
        error: "ERROR! Can't find data"
      });
    }
  } catch(err) {
    items = await getData();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      error: "ERROR! Failed to find data that you want to update"
    });
  }
});

app.post("/delete", async (req, res) => {
  const itemID = req.body.deleteItemId;
  try {
    const result = await db.query(
      'DELETE FROM items WHERE id = $1',
      [itemID]
    );
    res.redirect('/');
  } catch(err) {
    items = await getData();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      error: "ERROR! Failed to delete data"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
