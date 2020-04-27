import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";

const Alert = (props) => {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const CustomizedToast = ({
   message = "Alert Message",
   type = "info",
   duration = 6000,
   isOpen = false,
   vertical = "top",
   horizontal = "right",
}) => {
   const [open, setOpen] = useState(false);
   const handleClose = (event, reason) => {
      if (reason === "clickaway") {
         return;
      }

      setOpen(false);
   };
   useEffect(() => {
      if (message !== "") setOpen(true);
   }, [message]);

   return (
      <Snackbar
         open={open}
         autoHideDuration={duration}
         onClose={handleClose}
         anchorOrigin={{ vertical, horizontal }}
      >
         <Alert onClose={handleClose} severity={type}>
            {message}
         </Alert>
      </Snackbar>
   );
};
