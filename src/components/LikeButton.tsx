// import { useMutation } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import LIKE_POST, { LikePostMutation, LikePostVars } from "../graphql/mutations/like_post";
import { Like, User } from "../graphql/types";

interface Props {
  id: string;
  likes: Like[];
  likeCount: number;
  user: User | null;
}

const LikeButton: React.FC<Props> = ({ user, id, likes, likeCount }) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation<LikePostMutation, LikePostVars>(LIKE_POST, {
    variables: { postId: id },
    onError: (error) => {
      console.error(error);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={() => likePost()}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};
export default LikeButton;
