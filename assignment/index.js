const express = require("express");
const app = express();
const path = require("path");
const bodyParser  = require('body-parser')
const rootAddress = path.dirname(require.main.filename);

app.use(express.static(path.join(rootAddress, "views")));
// app.use(express.json()) 

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(rootAddress, "views", "main.html"));
});

// Route for user with ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`<h1>${id}</h1>`);
});

// Route for user query
app.get("/user", (req, res) => {
  console.log("Request Query is ", req.query);
  res.sendFile(path.join(rootAddress, "views", "user.html"));
});

// POST route for /user
app.post("/user", (req, res) => {
  console.log("req.body" ,req.body); //it will undefined so u have to parse the request
  return res.send("Posted successfully");
});

// Route for /product
app.get("/product", (req, res) => {
  res.send("Hiie");
});

// 404 route
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootAddress, "views", "404.html"));
});
const Port = process.env.Port || 3001;
app.listen(Port, () => {
  console.log(`Running on Port ${Port}`);
});
