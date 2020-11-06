import { gql } from "@apollo/client";
import { User } from "../types";

export type LoginVars = {
  username: string;
  password: string;
};

export type LoginQuery = { login: User };

export default gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
