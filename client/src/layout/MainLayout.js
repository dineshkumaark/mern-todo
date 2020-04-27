import React, { Component } from "react";
import Navbar from "../component/navbar";

export class MainLayout extends Component {
   render() {
      let { children, history } = this.props;

      return (
         <>
            <Navbar history={history} />
            {children}
         </>
      );
   }
}
