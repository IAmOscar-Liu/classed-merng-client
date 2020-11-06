// import {useMutation } from 'react-apollo';
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import DELETE_COMMENT from "../graphql/mutations/delete_comment";
import DELETE_POST from "../graphql/mutations/delete_post";
import GET_POSTS, { GetPostsQuery } from "../graphql/queries/getPosts";

interface Props {
  postId: string;
  commentId?: string;
  callback?: () => void;
}

type DeletePostOrCommentVars = {
  postId: string;
  commentId: string | undefined;
};

const DeleteButton: React.FC<Props> = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostorComment] = useMutation<any, DeletePostOrCommentVars>(
    mutation,
    {
      variables: { postId, commentId },
      update(proxy) {
        setConfirmOpen(false);
        // For delete comment(return 'string'), update cache
        if (!commentId) {
          const data = proxy.readQuery<GetPostsQuery>({ query: GET_POSTS });
          const remainPosts = data?.getPosts.filter((p) => p.id !== postId);
          proxy.writeQuery({
            query: GET_POSTS,
            data: { ...data, getPosts: remainPosts },
          });
        }
        if (callback) {
          // console.log('use callback');
          callback();
        }
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostorComment()}
      />
    </>
  );
};
export default DeleteButton;
