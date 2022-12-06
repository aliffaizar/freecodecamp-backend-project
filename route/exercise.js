const express = require("express");
const {
  getUsers,
  createExercise,
  createUser,
  getExercises,
} = require("../controllers/exerciseController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/:_id/exercises", createExercise);
router.get("/:_id/logs", getExercises);

module.exports = router;
