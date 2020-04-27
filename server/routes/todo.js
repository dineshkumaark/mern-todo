const express = require("express");
const Router = express.Router();

// Middleware
const { todoValidation } = require("../middleware/auth");

// Controllers
const todoController = require("../controllers/todocontroller");

Router.get("/getAll", todoValidation, todoController.getAllTodoController);

Router.post("/create", todoValidation, todoController.createTodoController);

Router.put("/edit", todoValidation, todoController.editTodoController);

Router.get("/edit/:id", todoValidation, todoController.editTodoController);

Router.delete(
   "/delete/:id",
   todoValidation,
   todoController.deleteTodoController
);

Router.post("/filterdate", todoController.filterDateController);

module.exports = Router;
