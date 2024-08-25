const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema({
  taskName: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    require: true,
  },
});

const taskModel = mongoose.model("todos", taskSchema);

module.exports = taskModel;
