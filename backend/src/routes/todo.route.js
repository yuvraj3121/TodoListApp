import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/addTodo").post(addTodo);
router.route("/allTodos").get(getTodos);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
