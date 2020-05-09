import React, { Component } from "react";
import "./nav.css";
class Nav extends Component {
  render() {
    return (
      <ul className="menu">
        <li id="navButton">
          <a href="/home">Submission</a>
        </li>
        <li id="navButton">
          <a href="/browser">Browser</a>
        </li>
        <li id="navButton">
          <a href="/register">Get User ID</a>
        </li>
      </ul>
    );
  }
}

export default Nav;
