import { gql } from "@apollo/client";
import { User } from "../types";

export type RegisterInput = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

export type RegisterVars = {
  registerInput: RegisterInput;
};

export type RegisterQuery = {
  register: User;
};

export default gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
