const { Todo } = require("../models/Todo");

class TodoServices {
   createTodo(todo, user) {
      todo.createdBy = user._id;
      todo.done = false;
      const todoData = new Todo(todo);
      return new Promise(async (resolve, reject) => {
         try {
            const data = await todoData.save();
            resolve(data);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   getAllTodo(id) {
      return new Promise(async (resolve, reject) => {
         try {
            const todos = await Todo.find({ createdBy: id }, null, {
               limit: 10,
            });
            resolve(todos);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   editTodo(todo) {
      const { _id, title } = todo;
      return new Promise(async (resolve, reject) => {
         try {
            const todo = await Todo.findOneAndUpdate({ _id }, { title });
            resolve(todo);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   changeDone(req) {
      const { id } = req.params;
      const { done } = req.query;
      return new Promise(async (resolve, reject) => {
         try {
            const todo = await Todo.findOneAndUpdate({ _id: id }, { done });
            resolve(todo);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   deleteTodo(_id) {
      return new Promise(async (resolve, reject) => {
         try {
            await Todo.deleteOne({ _id });
            resolve();
         } catch (err) {
            reject(err.message);
         }
      });
   }
}

module.exports = new TodoServices();
