import { Navigate, Route } from "react-router-dom";

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Navigate
                to={`/login?redirect=${props.location.pathname}${props.location.search}`}
              />}
      />
    );
  }