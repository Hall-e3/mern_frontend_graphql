import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuBar from "../components/Menu";
import { Home, Login, Register } from "../views";
export default function Routings() {
  return (
    <Router>
      <div>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}
