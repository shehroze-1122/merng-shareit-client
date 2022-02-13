import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Popup } from "semantic-ui-react";

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likesCount
    }
  }
`;

const Like = ({ user, post: { id, likes, likesCount } }) => {
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST_MUTATION);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const onClick = () => {
    likePost({
      variables: {
        postId: id,
      },
    });
  };

  return user ? (
    <Popup
      inverted
      content="Like Post"
      trigger={
        <Button
          basic={!liked}
          color="green"
          icon="heart"
          label={{
            basic: false,
            color: "green",
            pointing: "left",
            content: likesCount,
          }}
          size="large"
          style={{ margin: "7px 4px" }}
          onClick={onClick}
        />
      }
    />
  ) : (
    <Popup
      inverted
      content="Like Post"
      trigger={
        <Button
          basic
          color="green"
          icon="heart"
          label={{
            basic: false,
            color: "green",
            pointing: "left",
            content: likesCount,
          }}
          size="large"
          style={{ margin: "7px 4px" }}
        />
      }
    />
  );
};

export default Like;
