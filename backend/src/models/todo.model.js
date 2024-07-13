import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      required: [true, "required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
