import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(window.localStorage.getItem('HEALY'));
  
  const signInUser = (user) => {
    window.localStorage.setItem('HEALY', JSON.stringify(user));
    setCurrentUser(user);
  }

  const signOutUser = () => {
    window.localStorage.removeItem('HEALY');
    setCurrentUser(null);
  }
  
  useEffect(() => {
    const data = window.localStorage.getItem('HEALY');
    const parsedData = JSON.parse(data);
    if (!parsedData) {
      setCurrentUser(null);
      return;
    } 
    const decodedJwt = parseJwt(parsedData.accessToken);
    if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
      window.localStorage.clear();
      setCurrentUser(null);
      return;
    }
    if (data !== null) {
      setCurrentUser(JSON.parse(data));
    }
  }, []);

  const value = {currentUser, setCurrentUser, signInUser, signOutUser};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
