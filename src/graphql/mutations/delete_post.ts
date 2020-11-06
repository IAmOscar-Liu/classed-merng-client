import { gql } from "@apollo/client";

export default gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
