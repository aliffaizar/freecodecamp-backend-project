const express = require("express");
const cors = require("cors");
const timestampRoute = require("./src/timestamp");
const shortenerRoute = require("./src/shortener");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.get("/timestamp", (req, res) => {
  res.sendFile(__dirname + "/views/timestamp.html");
});

app.get("/whoami", (req, res) => {
  res.sendFile(__dirname + "/views/whoami.html");
});

app.get("/shortener", (req, res) => {
  res.sendFile(__dirname + "/views/shortener.html");
});

app.use("/api/timestamp", timestampRoute);
app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip.replace("::ffff:", ""),
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

app.use("/api/shortener", shortenerRoute);

app.listen(PORT, () => {
  console.log(`app runing at port ${PORT}`);
});
