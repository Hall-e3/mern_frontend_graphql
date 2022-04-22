import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      email
      username
      token
    }
  }
`;


export const REGISTER_USER = gql`
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
