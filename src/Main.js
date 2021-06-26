import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Trees from "./Trees";
import Users from "./Users";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Pet Tree</h1>
          <ul className="header">
            <li><NavLink to="/">Trees</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Trees} />
            <Route path="/users" component={Users} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
