const { Exercise, User } = require("../models/Exercise");

exports.createUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.create({
    username,
  });
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.createExercise = async (req, res) => {
  let { description, duration, date } = req.body;
  if (!date) date = new Date();
  const _id = req.params._id;
  const user = await User.findById(_id);
  const exercise = await Exercise.create({
    description,
    duration,
    date,
    userId: user._id,
    username: user.username,
  });
  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
    _id: user._id,
  });
};

exports.getExercises = async (req, res) => {
  const userId = req.params._id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  let filter = { userId };
  let dateFilter = {};
  if (req.query.from) {
    dateFilter.$gte = new Date(req.query.from);
  }
  if (req.query.to) {
    dateFilter.$lte = parseInt(new Date(req.query.to).getTime()) + 86400;
  }
  if (dateFilter.$gte || dateFilter.$lte) {
    filter.date = dateFilter;
  }
  let exercises;
  console.log(filter);
  if (req.query.limit)
    exercises = await Exercise.find(filter).limit(Number(req.query.limit));
  else exercises = await Exercise.find(filter);
  exercises = exercises.map((exercise) => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
  }));

  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: exercises,
  });
};
