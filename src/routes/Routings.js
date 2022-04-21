import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthRoute } from "../components";

import MenuBar from "../components/Menu";
import { Home, Login, Register } from "../views";
export default function Routings() {
  return (
    <Router>
      <div>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}
