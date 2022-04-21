import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/index";

const CREATE_POST = gql`
  mutation createPost($description: String!) {
    createPost(post: { description: $description }) {
      description
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        description
        createdAt
      }
    }
  }
`;

export default function PostForm() {
  const { handleSubmit, postValues, handleInputChange } =
    useForm(createPostCallback);

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
    },
    variables: postValues,
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi world"
          name="description"
          onChange={handleInputChange}
          value={postValues.description}
        />
        <Button
          type="submit"
          color="teal"
          fluid
          className={loading ? "loading" : null}
        >
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}
