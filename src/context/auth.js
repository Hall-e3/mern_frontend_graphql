import React from "react";
import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};

if (localStorage.getItem("auth_token")) {
  const decoded_token = jwtDecode(localStorage.getItem("auth_token"));
  if (decoded_token.exp * 1000 < Date.now()) {
    localStorage.removeItem("auth_token");
  } else {
    initialState.user = decoded_token;
  }
}

const AuthContext = createContext(initialState);

function AuthReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, { ...initialState });

  function login(userData) {
    localStorage.setItem("auth_token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    localStorage.removeItem("auth_token");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
