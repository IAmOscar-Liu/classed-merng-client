import React from "react";
import { gql, useSubscription } from "@apollo/client";
import { Post } from "./graphql/types";
import GET_POSTS, { GetPostsQuery } from "./graphql/queries/getPosts";

interface Props {}

const NEW_POST = gql`
  subscription newPost {
    newPost {
      id
      username
      body
      createdAt
    }
  }
`;

const TestSubscription: React.FC<Props> = () => {
  const { loading, data } = useSubscription<{ newPost: Post }>(NEW_POST, {
    onSubscriptionData(data) {
      const cache = data.client.cache;
      const newPost = data.subscriptionData.data?.newPost;

      const oldData = cache.readQuery<GetPostsQuery>({ query: GET_POSTS });
      const newDataPosts = [newPost, ...oldData!.getPosts];
      const newData = { ...oldData, getPosts: newDataPosts };
      cache.writeQuery({ query: GET_POSTS, data: newData });
    },
  });

  return (
    <div>
      <h5>Latest Post</h5>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <p>{data?.newPost?.username}</p>
          <p>{data?.newPost?.body}</p>
          <p>{data?.newPost?.createdAt}</p>
        </div>
      )}
    </div>
  );
};
export default TestSubscription;
