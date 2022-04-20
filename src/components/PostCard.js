import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { gql} from "@apollo/client";
import moment from "moment";
import { Link } from "react-router-dom";

const LIKE_POST = () => gql`
  mutation {
    likePost(postId: "625ad618d28c1a2d01fa9066") {
      description
      username
      id
      username
      createdAt
    }
  }
`;

export default function PostCard({
  post: {
    description,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const [filled, setFilled] = React.useState(false);
  const likePost = () => {
    setFilled(!filled);
  };
  const commentPost = () => {
    console.log("comment post");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content style={{ display: " flex" }}>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" className={filled ? null : "basic"}>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}
