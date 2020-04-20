const { Todo } = require("../models/Todo");

// Services
const todoServices = require("../services/todoServices");

const getAllTodoController = async (req, res, next) => {
   try {
      const { _id } = req.user;
      const todos = await todoServices.getAllTodo(_id);
      res.send({ success: true, data: todos });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const createTodoController = async (req, res, next) => {
   try {
      const todo = await todoServices.createTodo(req.body, req.user);
      res.send({ success: true, data: todo });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const editTodoController = async (req, res, next) => {
   try {
      if (req.method !== "GET") {
         await todoServices.editTodo(req.body);
      } else {
         await todoServices.changeDone(req);
      }
      res.send({ success: true, message: "Updated Successfully" });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const deleteTodoController = async (req, res, next) => {
   try {
      await todoServices.deleteTodo(req.params.id);
      res.send({ success: true, message: "Deleted Successfully" });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

module.exports = {
   getAllTodoController,
   createTodoController,
   editTodoController,
   deleteTodoController,
};
