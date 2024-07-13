import { Todo } from "../models/todo.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();

  if (!todos)
    throw new apiError(500, "no todos or error while fetchinging todos!");

  return res
    .status(200)
    .json(new apiResponse(200, todos, "todos fetched successfully."));
});

const addTodo = asyncHandler(async (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === "") throw new apiError(400, "task is required!");

  const todo = await Todo.create({
    task,
  });

  if (!todo) throw new apiError(500, "error while adding task");

  return res
    .status(200)
    .json(new apiResponse(200, todo, "task added successfully."));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { task } = req.body;
  const todoId = req.params.id;

  // console.log("req.params.id:", req.params.id);
  // console.log("todoId:", todoId);

  if (!task || task.trim() === "") throw new apiError(400, "task required!");

  if (!todoId) throw new apiError(400, "todoID is missing!");
  if (!mongoose.Types.ObjectId.isValid(todoId))
    throw new apiError(400, "invalid todoId!");

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      $set: {
        task,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTodo)
    throw new apiError(500, "todo not found or error while updating todo!!");

  return res
    .status(200)
    .json(new apiResponse(200, updatedTodo, "todo updated successfully."));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  if (!todoId) throw new apiError(400, "todoID is missing!");
  if (!mongoose.Types.ObjectId.isValid(todoId))
    throw new apiError(400, "invalid todoId!");

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  if (!deletedTodo)
    throw new apiError(500, "todo not found or error while deleting todo!!");

  return res
    .status(200)
    .json(new apiResponse(200, deletedTodo, "todo deleted successfully."));
});

export { getTodos, addTodo, updateTodo, deleteTodo };
