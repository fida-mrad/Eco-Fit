import React from "react";
import { Navigate, Route} from "react-router-dom";

const PrivateRoute = ({ component: Component, client, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      client ? (
        <Component {...props} />
      ) : (
        Navigate('/signin', { state: { from: props.location } })
      )
    }
  />
);

export default PrivateRoute;
