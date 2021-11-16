const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req.method);
  res.send("Hello World!");
});

app.patch("/", (req, res) => {
  console.log(req.method);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
