import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export const DialogAlert = ({ open = false, handleAction = () => {} }) => {
   return (
      <div>
         <Dialog
            open={open}
            onClose={handleAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Are You Sure You Want To Delete This Todo?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleAction}
                  color="primary"
                  variant="contained"
               >
                  No
               </Button>
               <Button
                  onClick={(e) => handleAction(e, true)}
                  variant="outlined"
                  color="primary"
               >
                  Yes
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};
