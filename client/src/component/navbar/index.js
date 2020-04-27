import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHomePageDetails } from "action/home";
import { api } from "service/api";
import { logout } from "service/apiVariables";

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
   },
}));

const theme = {
   background: "linear-gradient(45deg, #335085, #282d57)",
};

const NavbarFOC = (props) => {
   const classes = useStyles();

   const handleLogout = () => {
      const { userId } = props.data;
      logout.body = {
         _id: userId,
      };
      api(logout)
         .then(() => {
            localStorage.removeItem("w_auth");
            props.history.push("/");
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar>
               <Typography variant="h6" className={classes.title}>
                  ClockDo
               </Typography>
               <Button color="inherit" onClick={handleLogout}>
                  <span className="mr-04">Logout</span>
                  <i className="icon-log-out"></i>
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   );
};

const mapStateToProps = (state) => ({
   data: state.home.data,
});

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      getHomePageDetails,
   });
};

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarFOC);

export default Navbar;
