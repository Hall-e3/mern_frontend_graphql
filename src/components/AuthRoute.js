import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

export default function AuthRoute({ component: Component, ...others }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...others}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
