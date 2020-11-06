import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/auth";

interface PrivateRouteProps extends RouteProps {}

export const AuthRoute: React.FC<PrivateRouteProps> = (props) => {
  const { user: currentUser } = useContext(AuthContext);

  if (currentUser) {
    const redirectComponent = () => <Redirect to="/" />;
    return <Route {...props} component={redirectComponent} />;
  } else {
    return <Route {...props} />;
  }
};

export default AuthRoute;
