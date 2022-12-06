const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const timestampRoute = require("./route/timestamp");
const shortenerRoute = require("./route/shortener");
const uploadRoute = require("./route/upload");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
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

app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/views/upload.html");
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
app.use("/api/upload", uploadRoute);

app.use("/exercise", (req, res) => {
  res.sendFile(__dirname + "/views/exercise.html");
});

app.use("/api/users", require("./route/exercise"));

app.listen(PORT, () => {
  console.log(`app runing at port ${PORT}`);
});
