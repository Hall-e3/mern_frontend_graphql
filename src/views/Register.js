import { gql } from "@apollo/client";
import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
const registerValues = {
  email: "",
  username: "",
  password: "",
};

const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      user: {
        email: $email
        username: $username
        password: $password
      }
    ) {
      email
      token
      username
      createdAt
    }
  }
`;

export const Register = () => {
  const [values, setValues] = React.useState(registerValues);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });

  const [show, setShow] = React.useState(false);
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const handleShowPassword = () => {
    setShow(!show);
  };
  return (
    <div className="register-container">
      <h3>Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          placeholder="username"
          name="username"
          value={values.username}
          type="text"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Email"
          placeholder="email"
          name="email"
          value={values.email}
          type="email"
          onChange={handleInputChange}
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={values.password}
          type={show ? "text" : "password"}
          onChange={handleInputChange}
          icon={
            <Icon
              onClick={handleShowPassword}
              name={show ? "eye slash" : "eye"}
            />
          }
        />
        
        <Button type="submit" primary>Register</Button>
      </Form>
    </div>
  );
};
