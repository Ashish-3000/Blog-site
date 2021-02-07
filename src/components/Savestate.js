import React, { useState, createContext } from "react";

export const LoggedUser = createContext();

export const LoggedIn = (props) => {
  const [loggedInUserName, setName] = useState("");
  return (
    <LoggedUser.Provider value={[loggedInUserName, setName]}>
      {props.children}
    </LoggedUser.Provider>
  );
};
