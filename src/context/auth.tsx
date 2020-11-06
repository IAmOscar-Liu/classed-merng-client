import React, { createContext, useReducer } from "react";
import { User } from "../graphql/types";
import jwtDecode from "jwt-decode";

const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: (userData: User) => {},
  logout: () => {},
});

type State = {
  user: User | null;
};

const initialState: State = { user: null };

if (localStorage.getItem(process.env.REACT_APP_JWT_TOKEN as string)) {
  const decodedToken = jwtDecode<any>(
    localStorage.getItem(process.env.REACT_APP_JWT_TOKEN as string) as string
  );
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(process.env.REACT_APP_JWT_TOKEN as string);
  } else {
    console.log(decodedToken);
    initialState.user = {
      id: decodedToken.id,
      username: decodedToken.username,
      email: decodedToken.email,
    };
  }
}

enum ActionType {
  LOG_IN,
  LOG_OUT,
}

type Action = {
  type: ActionType;
  payload?: User;
};

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.LOG_IN:
      return {
        ...state,
        user: action.payload!,
      };
    case ActionType.LOG_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

type Props = {
  children: JSX.Element;
};

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: User) => {
    localStorage.setItem(process.env.REACT_APP_JWT_TOKEN as string, userData.token!);
    dispatch({
      type: ActionType.LOG_IN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_JWT_TOKEN as string);
    dispatch({
      type: ActionType.LOG_OUT,
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
