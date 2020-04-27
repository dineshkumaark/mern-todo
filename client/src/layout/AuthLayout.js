import React, { Component } from "react";
// import { Button } from 'reactstrap';

export class AuthLayout extends Component {
   render() {
      let { children } = this.props;

      return <>{children}</>;
   }
}
