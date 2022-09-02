import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

const AuthRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  if (!currentUser) {
    console.log(location);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
