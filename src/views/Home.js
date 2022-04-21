import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, Grid } from "semantic-ui-react";
import { Error, Loading, PostCard, PostForm } from "../components";
import { AuthContext } from "../context/auth";



const GET_ALL_POSTS = gql`
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

export const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    setPosts(data?.getPosts);
  }, [data]);
  console.log(data);
  console.log(posts);
  // if(loading) return <Loading/>
  // if(error) return <Error error={error.message}/>
  return (
    <Container>
      <Grid columns={3}>
        <Grid.Row>
          <h1 className="title-center">Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm/>
            </Grid.Column>
          )}
          {loading ? (
            <Loading />
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
};
