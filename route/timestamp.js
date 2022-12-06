const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

router.get("/dateStr", (req, res) => {
  const { dateStr } = req.params;
  let date;
  if (isNaN(dateStr)) date = new Date(dateStr);
  else date = new Date(parseInt(dateStr));
  if (date.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

module.exports = router;
