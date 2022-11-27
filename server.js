const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 8080;

app.get("/", function (req, res) {
  fs.readFile(__dirname + "/data/html/page.html").then((contenuRetourne) => {
    res.setHeader("Content-Type", "text/html");

    res.writeHead(200);

    res.end(contenuRetourne);
  });
});

app.use("/images", express.static(__dirname + "/data/images"));
app.use("/css", express.static(__dirname + "/data/css"));

app.listen(port, () => {
  console.log(`L'application est lancée sur le  port : ${port}`);
});
