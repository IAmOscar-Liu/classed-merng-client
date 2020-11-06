// import { useQuery } from "react-apollo";
import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";
import GET_POSTS, { GetPostsQuery } from "../graphql/queries/getPosts";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { user } = useContext(AuthContext);
  const { data, error, loading } = useQuery<GetPostsQuery>(GET_POSTS);

  const posts = data?.getPosts;
  if (loading) return <div>Loading Posts</div>;
  if (error) return <h1>Sorry! Somethig went wrong!</h1>;

  return (
    // <div>Successfull</div>
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
