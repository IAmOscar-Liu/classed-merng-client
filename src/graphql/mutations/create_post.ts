import { gql } from "@apollo/client";
import { Post } from "../types";

export type CreatePostvars = {
    body: string,
}

export type CreatePostMutation = {
    createPost: Post,
}

export default gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
