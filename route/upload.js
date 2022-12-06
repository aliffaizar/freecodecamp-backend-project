const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "public/" });

router.post("/", upload.single("upfile"), (req, res) => {
  if (!req.file) res.json({ error: "Please provide file" });
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

module.exports = router;
