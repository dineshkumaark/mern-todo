import React, { useState } from "react";
import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   DialogContentText,
   FormControl,
   Tooltip,
   Typography,
} from "@material-ui/core";

import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

export const DialogForm = ({
   open = false,
   isEdit = false,
   onClose = () => {},
   handleInputChange = () => {},
   handleDateChange = () => {},
   handleCreate = () => {},
   formData = {},
   avatarImages = [],
}) => {
   const [isTitleError, setTitleError] = useState(false);
   return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
         <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="sm"
            onBackdropClick={() => onClose("isFormOpen")}
         >
            <DialogTitle id="form-dialog-title">{`${
               isEdit ? "Update Task" : "Create New Task"
            }`}</DialogTitle>
            <DialogContent>
               <form className="dialog-form">
                  <FormControl className="mb-2" fullWidth>
                     <TextField
                        id="title"
                        label="Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        autoFocus
                        onBlur={() => {
                           if (formData.title === "") setTitleError(true);
                        }}
                        error={isTitleError}
                        helperText={isTitleError ? "Title Required" : ""}
                        value={formData.title}
                        onChange={(e) => {
                           const { value } = e.target;
                           if (value !== "") setTitleError(false);
                           handleInputChange(e);
                        }}
                     />
                  </FormControl>
                  <FormControl className="mb-2" fullWidth>
                     <KeyboardDatePicker
                        autoOk
                        variant="outlined"
                        label="Date"
                        placeholder="2018/01/01"
                        inputVariant="outlined"
                        mask="____/__/__"
                        disablePast
                        value={formData.date}
                        allowKeyboardControl
                        onChange={(date) => handleDateChange(date, "date")}
                        invalidDateMessage={
                           <>
                              <i className="icon-error"></i> Invalid Date
                           </>
                        }
                     />
                  </FormControl>
                  <div className="todo-timings">
                     <FormControl className="mb-2" fullWidth>
                        <KeyboardTimePicker
                           label="Starting Time"
                           value={formData.time}
                           inputVariant="outlined"
                           minutesStep={5}
                           mask="__:__ _M"
                           keyboardIcon={<i className="icon-time"></i>}
                           fullWidth
                           onChange={(date) => handleDateChange(date, "time")}
                           invalidDateMessage={
                              <>
                                 <i className="icon-error"></i> Invalid Time
                              </>
                           }
                        />
                     </FormControl>
                     <FormControl className="mb-2" fullWidth>
                        <KeyboardTimePicker
                           label="Ending Time"
                           inputVariant="outlined"
                           minutesStep={5}
                           mask="__:__ _M"
                           keyboardIcon={<i className="icon-time"></i>}
                           fullWidth
                        />
                     </FormControl>
                  </div>
                  <div className="todo-avatar-list">
                     <Typography className="mb-2" variant="h6">
                        Choose Avatar
                     </Typography>
                     <div className="avatar-lists">
                        {avatarImages.map(({ title, url }) => (
                           <div
                              key={title}
                              className={`${
                                 (formData.avatar === `http://${url}` ||
                                    title === formData.avatar) &&
                                 "selected"
                              } avatar-item`}
                           >
                              <Tooltip title={title} placement="top">
                                 <img
                                    src={`http://${url}`}
                                    alt={title}
                                    id={title}
                                    onClick={(e) =>
                                       handleInputChange(e, "avatar")
                                    }
                                 />
                              </Tooltip>
                           </div>
                        ))}
                     </div>
                  </div>
               </form>
            </DialogContent>
            <DialogActions className="mb-2 mr-1">
               <Button
                  onClick={() => onClose("isFormOpen")}
                  color="primary"
                  variant="outlined"
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleCreate}
                  color="primary"
                  variant="contained"
               >
                  {`${isEdit ? "Update" : "Create"}`}
               </Button>
            </DialogActions>
         </Dialog>
      </MuiPickersUtilsProvider>
   );
};
