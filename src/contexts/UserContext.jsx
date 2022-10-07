import { createContext, useEffect, useState } from "react";



export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const signInUser = (user) => {
    window.localStorage.setItem('HEALY', JSON.stringify(user));
    setCurrentUser(user);
  }

  const signOutUser = () => {
    window.localStorage.removeItem('HEALY');
    setCurrentUser(null);
  }

  const checkLocalStorage = () => {
    const data = window.localStorage.getItem('HEALY');
    return data;
  }
  
  useEffect(() => {
    const data = window.localStorage.getItem('HEALY');
    if (data !== null) {
      setCurrentUser(JSON.parse(data));
    }
  }, []);

  const value = {currentUser, setCurrentUser, signInUser, checkLocalStorage, signOutUser};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
