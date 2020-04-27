import React from "react";
import {
   ListSubheader,
   ListItemText,
   ListItemAvatar,
   ListItem,
   List,
   Avatar,
   ListItemSecondaryAction,
   Typography,
   Container,
   Button,
   Grid,
   IconButton,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { TodoSkeletion } from "component/TodoSkeleton";
const moment = require("moment");

export const TodoList = ({
   todoDatas = [],
   handleEdit = () => {},
   deleteTodo = () => {},
   isLoading = false,
   filterText = "",
}) => {
   todoDatas = todoDatas.sort(
      (a, b) =>
         moment(a.startTime).format("YYYYMMDD") -
         moment(b.startTime).format("YYYYMMDD")
   );

   let dates = { today: false, tomorrow: false, yesterday: false };

   return (
      <List>
         <Grid container justify="space-between" alignItems="center">
            <Grid item xs={9} lg={11}>
               <Typography variant="h5" className="todo-title ">
                  {filterText}
               </Typography>
            </Grid>
            {filterText !== "All Todos" && (
               <Grid item xs={3} lg={1} align="right">
                  <Button variant="contained" color="primary">
                     Get All
                  </Button>
               </Grid>
            )}
         </Grid>
         {!isLoading ? (
            todoDatas.map(({ _id, title, avatar = "", startTime }, id) => {
               const formatedTime = moment(startTime).format("MMM DD, hh:mm A");
               const isTodoPast = moment(startTime).isBefore(moment());
               return (
                  <React.Fragment key={_id}>
                     <ListItem>
                        <ListItemAvatar>
                           <Avatar src={avatar} alt={title} />
                        </ListItemAvatar>
                        <ListItemText
                           primary={<h4>{title}</h4>}
                           secondary={formatedTime}
                        />
                        <ListItemSecondaryAction className="todo-actions">
                           <span
                              onClick={() => {
                                 if (!isTodoPast) handleEdit(_id);
                              }}
                              className="mr-1"
                           >
                              <i
                                 className={`${
                                    isTodoPast ? "icon-disabled" : ""
                                 } icon-edit`}
                              ></i>
                           </span>
                           <span onClick={() => deleteTodo(_id)}>
                              <i className="icon-delete"></i>
                           </span>
                        </ListItemSecondaryAction>
                     </ListItem>
                  </React.Fragment>
               );
            })
         ) : (
            <TodoSkeletion />
         )}
         {!isLoading && todoDatas.length === 0 ? (
            <Container maxWidth="sm">
               <Typography variant="h6" align="center">
                  {" "}
                  No Todo's Yet
               </Typography>
            </Container>
         ) : (
            ""
         )}
      </List>
   );
};
