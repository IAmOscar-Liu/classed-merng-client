import { gql } from "@apollo/client";
import { Post } from "../types";

export type CreateCommentMutation = { createComment: Post };
export type CreateCommentVars = { postId: string, body: string };

export default gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
