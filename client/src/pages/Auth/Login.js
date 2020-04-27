import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHomePageDetails } from "action/home";
import {
   Button,
   Container,
   Card,
   Grid,
   FormControl,
   TextField,
   FormControlLabel,
   Checkbox,
   Link,
} from "@material-ui/core";
import { login, register } from "../../service/apiVariables";
import { api } from "../../service/api";
import { CustomizedToast } from "../../helpers/toast";

export class LoginClass extends Component {
   state = {
      isLogin: true,
      name: "",
      email: "",
      password: "",
      isError: "",
      isOpen: false,
      messageType: "info",
      errorField: "",
   };

   toggle = (key) => {
      this.setState({
         [key]: !this.state[key],
      });
   };

   checkIsValid = ({ target: { name, value } }) => {
      let { errorField } = this.state;
      if (value === "") {
         errorField = `${name} `;
         this.setState({ errorField });
      }
   };

   handleInputChange = ({ target: { name, value } }) => {
      let { errorField } = this.state;
      if (name !== "") {
         errorField = errorField.replace(name, "");
      }
      this.setState({
         [name]: value,
         errorField,
      });
   };

   resetData = () => {
      this.setState({
         name: "",
         email: "",
         password: "",
      });
   };

   handleSubmit = (e) => {
      e.preventDefault();
      const { isLogin, name, password, email } = this.state;
      let apiVariable = isLogin ? login : register;
      apiVariable.body = { password, email };
      if (!isLogin) apiVariable.body.name = name;
      this.setState({ isOpen: false });

      api(apiVariable)
         .then((data) => {
            if (!isLogin)
               this.setState({
                  isLogin: true,
                  isOpen: true,
                  isError: data.message,
                  messageType: "success",
               });
            this.resetData();
            localStorage.setItem("w_auth", data.token);
            this.props
               .getHomePageDetails(data)
               .then((data) => {
                  this.props.history.push("/home");
               })
               .catch((err) => console.log(err));
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

   // componentDidMount() {
   //    this.props.getHomePageDetails();
   // }

   render() {
      const {
         isLogin,
         name,
         email,
         password,
         isOpen,
         messageType,
         errorField = "",
      } = this.state;
      return (
         <Container maxWidth="sm" className="mern-container">
            <Card className="mern-card">
               <div className="mern-welcome-text">
                  <h2>{isLogin ? "Welcome Back!" : "Get Started"}</h2>
                  {isLogin && <p>Login to continue</p>}
               </div>
               <form
                  className="mern-form-container"
                  onSubmit={this.handleSubmit}
               >
                  {!isLogin && (
                     <FormControl variant="outlined" fullWidth className="mb-2">
                        <TextField
                           id="name"
                           label="Name"
                           type="text"
                           name="name"
                           variant="outlined"
                           error={errorField.includes("name")}
                           onBlur={this.checkIsValid}
                           value={name}
                           helperText={
                              errorField.includes("name") && "Name is Required"
                           }
                           onChange={this.handleInputChange}
                        />
                     </FormControl>
                  )}
                  <FormControl variant="outlined" fullWidth className="mb-2">
                     <TextField
                        id="email"
                        label="Email Address"
                        type="text"
                        name="email"
                        variant="outlined"
                        value={email}
                        error={errorField.includes("email")}
                        onChange={this.handleInputChange}
                        helperText={
                           errorField.includes("email") && "Email is Required"
                        }
                        onBlur={this.checkIsValid}
                     />
                  </FormControl>
                  <FormControl variant="outlined" fullWidth className="mb-2">
                     <TextField
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        value={password}
                        error={errorField.includes("password")}
                        onChange={this.handleInputChange}
                        helperText={
                           errorField.includes("password") &&
                           "Password is Required"
                        }
                        onBlur={this.checkIsValid}
                     />
                  </FormControl>
                  {isLogin && (
                     <Grid container justify="space-between">
                        <Grid item>
                           <FormControlLabel
                              control={
                                 <Checkbox color="primary" name="checkedA" />
                              }
                              label="Remember me"
                           />
                        </Grid>
                        <Grid item>
                           <FormControlLabel
                              control={
                                 <Checkbox color="primary" className="d-none" />
                              }
                              label={
                                 <Link onClick={() => alert(123)}>
                                    Forgot Password?
                                 </Link>
                              }
                           />
                        </Grid>
                     </Grid>
                  )}
                  <Grid
                     container
                     justify="space-between"
                     className="action-btn-block"
                  >
                     <Grid item>
                        <Button
                           variant="contained"
                           color="primary"
                           className="actionBtn"
                           type="submit"
                        >
                           {isLogin ? "Login" : "Sign Up"}
                        </Button>
                     </Grid>
                     <Grid item>
                        {!isLogin && <span>Already Registered?</span>}
                        <Link onClick={() => this.toggle("isLogin")}>
                           {isLogin ? "Need Account?" : " Sign In"}
                        </Link>
                     </Grid>
                  </Grid>
                  <div></div>
               </form>
            </Card>
            {isOpen && (
               <CustomizedToast
                  message={this.state.isError}
                  type={messageType}
               />
            )}
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

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginClass);
