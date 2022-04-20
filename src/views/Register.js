import { gql } from "@apollo/client";
import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import Error from "../components/Error";
import { useForm } from "../utils";

const REGISTER_USER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(
      user: { email: $email, username: $username, password: $password }
    ) {
      email
      token
      username
      createdAt
    }
  }
`;

export const Register = (props) => {
  const {
    handleInputChange,
    handleSubmit,
    registerValues,
    show,
    handleShowPassword,
  } = useForm(registerUser);

  const [addUser, { loading, error }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/login");
    },
    variables: registerValues,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="register-container">
      <h3>Register</h3>
      {error && <Error errorMessage={error.message} />}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          placeholder="username"
          name="username"
          value={registerValues.username}
          type="text"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Email"
          placeholder="email"
          name="email"
          value={registerValues.email}
          type="email"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={registerValues.password}
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
          Register
        </Button>
      </Form>
    </div>
  );
};
