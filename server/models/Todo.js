const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = Schema(
   {
      title: {
         type: String,
         trim: true,
      },
      avatar: String,
      startTime: Date,
      done: Boolean,
      createdBy: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
