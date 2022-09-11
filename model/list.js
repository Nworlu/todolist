const mongoose = require("mongoose");
const todolistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 0,
    max: 25,
  },

  date: {
    type: Date,
    required: true,
    min: "1999-09-28",
    max: "2025-05-23",
  },

  completed: {
    type: Boolean,
    default: false,
  },

  importance: {
    type: Boolean,
  },
});

const Lists = mongoose.model("todolist", todolistSchema);

module.exports = Lists;
