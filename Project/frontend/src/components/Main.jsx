import React from "react";
import Protected from "./Protected";
import Public from "./Public";
import Nav from "./Nav";

const Main = ({ token, isLoggedIn, isAdmin, logIn, logOut }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Protected token={token} />
        </div>
      ) : (
        <Public />
      )}
    </div>
  );
};

export default Main;
