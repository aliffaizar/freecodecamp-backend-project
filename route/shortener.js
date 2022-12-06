const express = require("express");

const router = express.Router();

const isValidUrl = (url) => {
  return /^(http|https):\/\/[^ "]+$/.test(url);
};

const data = [
  { original_url: "https://github.com", short_url: 1 },
  { original_url: "https://google.com", short_url: 2 },
];

router.get("/", (req, res) => {
  res.json({ data });
});

router.post("/", (req, res) => {
  if (!isValidUrl(req.body.url)) res.json({ error: "invalid url" });
  const original_url = req.body.url;
  const short_url = data.length + 1;
  data.push({ original_url, short_url });
  res.json({ original_url, short_url });
});

router.get("/:id", (req, res) => {
  const url = data.find((el) => el.short_url == req.params.id);
  res.redirect(url.original_url);
});

module.exports = router;
