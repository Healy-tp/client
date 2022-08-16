import PropTypes from "prop-types";
import { Navigate, Route } from "react-router-dom";

// import { useAuth } from "../../store/AuthContext"; TODO: add this

const AuthRoute = ({ children, ...props }) => {
  // const { currentUser } = useAuth();
  const currentUser = false;

  return (
    <Route
      {...props}
      render={() => {
        const shouldSignIn = !currentUser;
        
        if (shouldSignIn) {
          return <Navigate to="/login" />;
        }

        return children;
      }}
    />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
