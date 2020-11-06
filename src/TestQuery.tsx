import React from "react";
import { useQuery } from "@apollo/client";
import GET_POSTS, { GetPostsQuery } from "./graphql/queries/getPosts";

interface Props {}

const TestQuery: React.FC<Props> = () => {
  const { data, loading, error } = useQuery<GetPostsQuery>(GET_POSTS, {
    onError(err) {
      console.error(err);
    },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <h3>Error!</h3>;

  return (
    <div>
      {data?.getPosts.map((post) => (
        <p>
          username: {post.username}, body: {post.body}, createdAt:{" "}
          {post.createdAt}
        </p>
      ))}
      ;
    </div>
  );
};
export default TestQuery;
