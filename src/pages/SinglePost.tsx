// import { useQuery } from "react-apollo";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Button, Card, Form, Grid, Icon, Image, Label } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import CREATE_COMMENT, { CreateCommentMutation, CreateCommentVars } from "../graphql/mutations/create_comment";
import GET_POST, { GetPostQuery, GetPostVars } from "../graphql/queries/getPost";

type TParams = { postId: string };

interface Props extends RouteComponentProps<TParams> {}

const SinglePost: React.FC<Props> = ({ match }) => {
  // const SinglePost = ({ match }: RouteComponentProps<TParams>) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const postId = match.params.postId;

  const [comment, setComment] = useState<string>("");
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const { data, error, loading } = useQuery<GetPostQuery, GetPostVars>(
    GET_POST,
    {
      variables: { postId },
    }
  );

  const [createComment] = useMutation<CreateCommentMutation, CreateCommentVars>(
    CREATE_COMMENT,
    {
      variables: {
        postId,
        body: comment,
      },
      update() {
        setComment("");
        commentInputRef.current?.blur();
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  function deletePostCallback() {
    history.push("/");
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post...</p>;
  } else if (error || data?.getPost === undefined) {
    console.error(error);
    postMarkup = <h1>Query Failed...</h1>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      commentCount,
      likes,
      likeCount,
    } = data?.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  user={user}
                  id={id}
                  likeCount={likeCount}
                  likes={likes}
                />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a Comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={() => createComment()}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
