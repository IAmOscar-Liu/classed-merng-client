// import { useMutation } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import USER_LOGIN, { LoginQuery, LoginVars } from "../graphql/mutations/login_user";
import { useForm } from "../hooks/useForm";

interface Props {}

const Login: React.FC<Props> = () => {
  const { login: userLogin } = useContext(AuthContext);
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm<LoginVars>(registerUser, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [loginUser, { loading }] = useMutation<LoginQuery, LoginVars>(
    USER_LOGIN,
    {
      update(_, result) {
        // console.log(result.data?.login!);
        userLogin(result.data?.login!);
        history.replace("/");
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions!.errors);
      },
      variables: { password: values.password, username: values.username },
    }
  );

  function registerUser() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Login;
