// import gql from "graphql-tag";
import { gql } from '@apollo/client';
import { Post } from '../types';

export type GetPostQuery = {
  getPost: Post;
};

export type GetPostVars = {
  postId: string,
}

export default gql`
  query Post($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
      }
    }
  }
`;
