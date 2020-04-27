import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHomePageDetails } from "action/home";
import { Container, Fab, Grid } from "@material-ui/core";

import { DialogForm } from "../../component/DialogForm";
import {
   getAvatarImages,
   createTodo,
   getAllTodo,
   editTodo,
   deleteTodo,
   filterDate,
} from "../../service/apiVariables";
import { api } from "../../service/api";
import { CustomizedToast } from "helpers/toast";
import { TodoList } from "component/TodoList";
import { DialogAlert } from "component/DialogAlert";
const moment = require("moment");

export class TodoClass extends Component {
   state = {
      todayDate: moment().date(),
      avatarImages: [],
      currentDay: moment().format("dddd DD,MMMM"),
      isError: "",
      filterText: "All Todos",
      isOpen: false,
      isEdit: false,
      isFormOpen: false,
      isAlertOpen: false,
      isLoading: false,
      messageType: "info",
      todo: {
         title: "",
         date: Date.now(),
         time: Date.now(),
         avatar: "",
      },
      todoDatas: [],
   };

   toggle = (key) => {
      this.setState({
         [key]: !this.state[key],
      });
   };

   resetDate = () => {
      let { todo } = this.state;
      todo = {
         title: "",
         date: Date.now(),
         time: Date.now(),
         avatar: "",
      };
      this.setState({
         todo,
      });
   };

   handleInputChange = ({ target: { id, value } }, name) => {
      const { todo } = this.state;
      if (name === "avatar") {
         todo[name] = id;
      } else {
         todo[id] = value;
      }
      this.setState(
         {
            todo,
         },
         () => console.log(this.state)
      );
   };

   handleDateChange = (date, name) => {
      const { todo } = this.state;
      todo[name] = date;
      this.setState({
         todo,
      });
   };

   handleDayChange = (date) => {
      const isToday = moment(date).isSame(moment(), "day");
      const isYesterday = moment()
         .subtract(1, "day")
         .isSame(moment(date), "day");
      const isTomorrow = moment().add(1, "day").isSame(moment(date), "day");
      let specialDay = null;
      if (isToday) {
         specialDay = "Today";
      } else if (isTomorrow) {
         specialDay = "Tomorrow";
      } else if (isYesterday) {
         specialDay = "Yesterday";
      }

      this.setState(
         {
            currentDay: moment(date).format("dddd DD,MMMM"),
            filterText: specialDay ? specialDay : moment(date).format("DD,MMM"),
         },
         () => {
            filterDate.body = { date: date.toISOString() };
            api(filterDate)
               .then((data) => this.setState({ todoDatas: data.data }))
               .catch((err) => console.log(err));
         }
      );
   };

   handleEdit = (id) => {
      const { todoDatas } = this.state;
      const filteredTodo = todoDatas.filter((todo) => todo._id === id)[0];
      filteredTodo["date"] = new Date(filteredTodo.startTime);
      filteredTodo["time"] = new Date(filteredTodo.startTime);
      this.setState(
         {
            todo: filteredTodo,
            isFormOpen: true,
            isEdit: true,
         },
         () => console.log(this.state)
      );
   };

   handleCreate = () => {
      const { date, time, avatar, title, _id } = this.state.todo;
      const { isEdit } = this.state;
      const dateLocalString = new Date(date).toLocaleDateString();
      const timeLocalString = new Date(time).toLocaleTimeString();

      const startTime = new Date(
         `${dateLocalString} ${timeLocalString}`
      ).toISOString();

      if (
         title === "" ||
         !moment(date).isValid ||
         !moment(time).isValid ||
         !moment().isBefore(moment(startTime))
      ) {
         return this.setState({
            isOpen: true,
            isError: "Please Fill Valid Details",
            messageType: "error",
         });
      }

      let payload = {
         startTime,
         avatar,
         title,
      };

      this.setState({ isOpen: false });

      if (!isEdit) {
         this._createTodo(payload);
      } else {
         payload._id = _id;
         console.log(payload);
         this._updateTodo(payload);
      }
   };

   handleActions = (_, canDelete) => {
      this.toggle("isAlertOpen");
      if (canDelete === true) this._apiTodo(deleteTodo);
   };

   deleteTodo = (id) => {
      this.toggle("isAlertOpen");
      deleteTodo.id = id;
   };

   _updateTodo = (payload) => {
      editTodo.body = payload;
      editTodo.token = true;
      this._apiTodo(editTodo);
   };

   _createTodo = (payload) => {
      createTodo.body = payload;
      createTodo.token = true;
      this._apiTodo(createTodo);
   };

   _apiTodo = (todo) => {
      api(todo)
         .then((data) => {
            console.log(data);
            this.setState({
               isOpen: true,
               isError: data.message,
               messageType: "success",
               isFormOpen: false,
            });
            this.resetDate();
            this._getAllTodos();
         })
         .catch((err) => {
            console.log(err);
            this.setState({
               isOpen: true,
               isError: err.message,
               messageType: "error",
            });
         });
   };

   _getAvatarImages = () => {
      api(getAvatarImages)
         .then((data) => this.setState({ avatarImages: data.images }))
         .catch((err) => console.log(err));
   };

   _getAllTodos = () => {
      this.setState({ isLoading: true });
      api(getAllTodo)
         .then((data) =>
            this.setState({ todoDatas: data.data, isLoading: false })
         )
         .catch((err) => console.log(err));
   };

   componentDidMount() {
      if (!localStorage.getItem("w_auth")) {
         return this.props.history.push("/");
      }
      this._getAllTodos();
      this._getAvatarImages();
   }

   render() {
      const {
         isEdit,
         avatarImages,
         todo,
         todoDatas,
         isOpen,
         messageType,
         isFormOpen,
         currentDay,
         isLoading,
         filterText,
      } = this.state;
      const days = ["S", "M", "T", "W", "T", "F", "S"];
      const startNum = moment().day();
      const startDate = moment().subtract(startNum, "d");
      const todayDay = moment(currentDay).date();

      return (
         <Container maxWidth="xl">
            <div className="mern-todo-section">
               <div className="mern-todo-section-header">
                  <Grid
                     container
                     xl
                     justify="space-between"
                     alignItems="center"
                  >
                     <Grid item xs={10} lg={11}>
                        <p>{currentDay}</p>
                     </Grid>
                     <Grid item xs={2} lg={1} align="center">
                        <Fab
                           color="secondary"
                           aria-label="add"
                           onClick={() => this.toggle("isFormOpen")}
                           size="small"
                        >
                           <i className="icon-add"></i>
                        </Fab>
                     </Grid>
                  </Grid>
                  <div className="mern-todo-date-label">
                     {days.map((data, index) => {
                        const currDate = moment(startDate).add(index, "days");
                        return (
                           <div className="mern-todo-date" key={index}>
                              <p>{data}</p>
                              <p
                                 className={`mern-todo-data-num ${
                                    todayDay === currDate.date() &&
                                    "current-day"
                                 }`}
                                 onClick={() => this.handleDayChange(currDate)}
                              >
                                 {currDate.date()}
                              </p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
            <TodoList
               todoDatas={todoDatas}
               handleEdit={this.handleEdit}
               deleteTodo={this.deleteTodo}
               isLoading={isLoading}
               filterText={filterText}
            />
            <DialogForm
               open={isFormOpen}
               avatarImages={avatarImages}
               formData={todo}
               handleDateChange={this.handleDateChange}
               handleInputChange={this.handleInputChange}
               handleCreate={this.handleCreate}
               onClose={this.toggle}
               isEdit={isEdit}
            />
            {isOpen && (
               <CustomizedToast
                  message={this.state.isError}
                  type={messageType}
               />
            )}
            <DialogAlert
               open={this.state.isAlertOpen}
               handleAction={this.handleActions}
            />
         </Container>
      );
   }
}

const mapStateToProps = (state) => ({
   data: state.home.data,
});

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
      {
         getHomePageDetails,
      },
      dispatch
   );
};

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoClass);
