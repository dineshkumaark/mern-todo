const { Todo } = require("../models/Todo");
const { Upload } = require("../models/Upload");
const moment = require("moment");

class TodoServices {
   createTodo(todo, user, name) {
      todo.createdBy = user._id;
      todo.avatar = todo.avatar || "";
      todo.done = false;
      const todoData = new Todo(todo);
      return new Promise(async (resolve, reject) => {
         try {
            todoData.avatar = await this.avatarHelper(todo.avatar, name);
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
   editTodo(body, name) {
      const { _id, title, avatar = "", startTime } = body;
      let updatedTodo = {};
      updatedTodo["title"] = title;
      updatedTodo["avatar"] = avatar;
      updatedTodo["startTime"] = startTime;

      return new Promise(async (resolve, reject) => {
         try {
            if (!avatar.includes("http://"))
               updatedTodo.avatar = await this.avatarHelper(avatar, name);
            const todo = await Todo.findOneAndUpdate({ _id }, updatedTodo);
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
   filterDate({ date = "" }) {
      const startDate = moment(date).startOf("day");
      const endDate = moment(date).endOf("day");
      return new Promise(async (resolve, reject) => {
         try {
            const todo = await Todo.find({
               startTime: { $gte: startDate, $lte: endDate },
            });
            resolve(todo);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   async avatarHelper(avatar, name) {
      let avatarImgUrl = "";
      try {
         const uploadedImages = await Upload.find({}, "images");
         const PORT = process.env.PORT;
         uploadedImages[0].images.map(({ originalname, filename }) => {
            if (originalname === avatar) {
               avatarImgUrl = `http://${name}:${PORT}/uploads/${filename}`;
            }
         });
         return avatarImgUrl;
      } catch (error) {
         console.log(error);
      }
   }
}

module.exports = new TodoServices();
