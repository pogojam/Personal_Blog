const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  console.log("hello world");

  return "hi";
  next();
});

app.listen(1111, () => {
  console.log("server up ");
});
