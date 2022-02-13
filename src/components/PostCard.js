import React, { useContext } from "react";
import { Image, Card, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { authContext } from "../context/AuthContextProvider";
import Like from "./Like";
import Delete from "./Delete";

const PostCard = ({
  post: { id, username, createdAt, body, commentsCount, likes, likesCount },
}) => {
  const { user } = useContext(authContext);

  return (
    <Card fluid style={{ marginBottom: "25px" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description as={Link} to={`/post/${id}`}>
          {body}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div style={{ display: "flex", alignItems: "center" }}>
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
                as={Link}
                to={`/post/${id}`}
              />
            }
          />

          {user && user.username === username && <Delete postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
