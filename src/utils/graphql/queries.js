import { gql } from "@apollo/client";
export const GET_ALL_POSTS = gql`
  {
    getPosts {
      id
      username
      description
      createdAt
      comments {
        description
      }
      likes {
        username
      }
      likeCount
      commentCount
    }
  }
`;
