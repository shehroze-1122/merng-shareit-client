import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { authContext } from "../context/AuthContextProvider";
import gql from "graphql-tag";
import {
  Dimmer,
  Loader,
  Grid,
  Card,
  Image,
  Button,
  Popup,
} from "semantic-ui-react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import Like from "../components/Like";
import Delete from "../components/Delete";
import Comments from "../components/Comments";

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      likes {
        id
        username
      }
      likesCount
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
    }
  }
`;
const Post = () => {
  const { postId } = useParams();

  const { user } = useContext(authContext);

  const navigate = useNavigate();

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  if (loading)
    return (
      <Dimmer active>
        <Loader
          active
          className="workaround"
          size="massive"
          inline="centered"
          content="Loading"
        />
      </Dimmer>
    );
  const {
    id,
    username,
    createdAt,
    body,
    likes,
    likesCount,
    comments,
    commentsCount,
  } = data.getPost;

  return (
    <Grid>
      <Grid.Column width={2}>
        <Image
          floated="right"
          size="large"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
          </Card.Content>

          <Card.Content extra>
            <div>
              <Like user={user} post={{ id, likes, likesCount }} />
              <Popup
                inverted
                content="Comment on post"
                trigger={
                  <Button
                    basic
                    color="blue"
                    icon="comment"
                    size="large"
                    label={{
                      basic: false,
                      color: "blue",
                      pointing: "left",
                      content: commentsCount,
                    }}
                  />
                }
              />

              {user && user.username === username && (
                <Delete
                  postId={id}
                  callback={() => navigate("/")}
                  style={{ marginLeft: "auto" }}
                />
              )}
            </div>
          </Card.Content>
        </Card>
        <Comments comments={comments} user={user} postId={id} />
      </Grid.Column>
    </Grid>
  );
};

export default Post;
