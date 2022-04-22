import React, { useContext } from "react";
import { gql } from "@apollo/client";
import { Form, Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import Error from "../components/Error";
import { useForm } from "../utils";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphql/mutations";


export const Login = (props) => {
  const context = useContext(AuthContext);
  const {
    handleInputChange,
    handleSubmit,
    loginValues,
    show,
    handleShowPassword,
  } = useForm(loginUser);

  const [addUser, { loading, error }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    variables: loginValues,
  });

  function loginUser() {
    addUser();
  }

  return (
    <div className="register-container">
      <h3>Sign In</h3>
      {error && <Error errorMessage={error.message} />}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          placeholder="username"
          name="username"
          value={loginValues.username}
          type="text"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={loginValues.password}
          type={show ? "text" : "password"}
          onChange={handleInputChange}
        />

        <Button
          type="submit"
          primary
          fluid
          className={loading ? "loading" : ""}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};
