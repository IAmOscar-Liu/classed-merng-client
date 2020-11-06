// import { useMutation } from "react-apollo";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import CREATE_POST_MUTATION, { CreatePostMutation, CreatePostvars } from "../graphql/mutations/create_post";
import GET_POSTS from "../graphql/queries/getPosts";
import { GetPostsQuery } from "../graphql/queries/getPosts";
import { useForm } from "../hooks/useForm";

interface Props {}

const PostForm: React.FC<Props> = () => {
  const { values, setValues, onChange, onSubmit } = useForm<CreatePostvars>(
    createPostCallback,
    { body: "" }
  );

  const [errors, setErrors] = useState<string | null>(null);

  const [createPost] = useMutation<CreatePostMutation, CreatePostvars>(
    CREATE_POST_MUTATION,
    {
      variables: values,
      update(proxy, result) {
        /*
        Important! 
        You can't change 'data' itself, you have to copy it and change it
      */
        const data = proxy.readQuery<GetPostsQuery>({ query: GET_POSTS });
        const newDataPosts = [result.data?.createPost, ...data!.getPosts];
        const newData = { ...data, getPosts: newDataPosts };
        proxy.writeQuery({ query: GET_POSTS, data: newData });
        // values.body = "";
        setValues({ ...values, body: "" });
        setErrors(null);
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].message);
      },
    }
  );

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post: </h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={errors ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {errors && (
        <div className="ui error message">
          <ul className="list">
            <li>{errors}</li>
          </ul>
        </div>
      )}
    </>
  );
};
export default PostForm;
