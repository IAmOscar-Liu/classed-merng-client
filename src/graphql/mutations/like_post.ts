import { gql } from "@apollo/client";
import { Post } from "../types";

export type LikePostMutation = { likePost: Post };
export type LikePostVars = { postId: string };

export default gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
