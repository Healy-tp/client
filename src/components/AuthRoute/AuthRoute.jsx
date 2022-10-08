import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

const parseJwt = (token) => {
  try {
    console.log('esto', atob(token.split(".")[1]));
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};


const AuthRoute = ({ children }) => {
  const { currentUser, signOutUser } = useContext(UserContext);
  const location = useLocation();
  
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  } else {
    const decodedJwt = parseJwt(currentUser.accessToken);
    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      signOutUser();
    }
  }
  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
