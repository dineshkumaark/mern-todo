import React from "react";

import { ListItemText, ListItemAvatar, ListItem } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export const TodoSkeletion = () => {
   return (
      <ListItem>
         <ListItemAvatar>
            <Skeleton
               animation="wave"
               variant="circle"
               width={40}
               height={40}
            />
         </ListItemAvatar>
         <ListItemText
            primary={
               <Skeleton
                  animation="wave"
                  variant="rect"
                  width="80%"
                  height={10}
                  style={{ marginBottom: 6 }}
                  className="sketeon-style"
               />
            }
            secondary={
               <Skeleton
                  animation="wave"
                  variant="rect"
                  width="40%"
                  height={10}
                  className="sketeon-style"
               />
            }
         />
      </ListItem>
   );
};
