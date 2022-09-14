let mongoose = require("mongoose");
const todolistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 35,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  completed: {
    type: Boolean,
    default: false,
  },

  importance: {
    type: Boolean,
    default: false,
  },
});

const Lists = mongoose.model("todolist", todolistSchema);

module.exports = Lists;
