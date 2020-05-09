import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import Nav from "./pages/nav/nav";
import Index from "./pages/index/index";
import Register from "./pages/register/register";
function App() {
  return (
    <Router>
      <div id="app">
        <Nav />
        <Route path="/home" component={Index} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
