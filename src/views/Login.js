import { gql } from "@apollo/client";
import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import Error from "../components/Error";
import { useForm } from "../utils";

const LOGIn_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      email
      username
      token
    }
  }
`;

export const Login = (props) => {
  const {
    handleInputChange,
    handleSubmit,
    loginValues,
    show,
    handleShowPassword,
  } = useForm(loginUser);

  const [addUser, { loading, error }] = useMutation(LOGIn_USER, {
    update(_, result) {
      console.log(result);
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
          icon={
            <Icon
              onClick={handleShowPassword}
              name={show ? "eye slash" : "eye"}
            />
          }
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
