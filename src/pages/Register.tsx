// import { useMutation } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import REGISTER_USER, { RegisterInput, RegisterQuery, RegisterVars } from "../graphql/mutations/register_user";
import { useForm } from "../hooks/useForm";

interface Props {}

const Register: React.FC<Props> = () => {
  const { login:userLogin } = useContext(AuthContext);
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm<RegisterInput>(registerUser, {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [addUser, { loading }] = useMutation<RegisterQuery, RegisterVars>(
    REGISTER_USER,
    {
      update(_, result) {
        // console.log(result);
        userLogin(result.data?.register!);
        history.replace("/");
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions!.errors);
      },
      variables: { registerInput: values },
    }
  );

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          tyep="email"
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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
export default Register;
