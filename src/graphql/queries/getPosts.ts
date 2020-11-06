// import gql from "graphql-tag";
import { gql } from '@apollo/client';
import { Post } from '../types';

export type GetPostsQuery = {
  getPosts: Post[];
};

export default  gql`
  query Posts {
    getPosts {
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
      commentCount
      likes         {
          id
          createdAt
          username
      }
      likeCount
    }
  }
`;