import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = ({ isLoggedIn, isAdmin, logIn, logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">My App</span>
      </div>
      <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="ml-auto">
          {isAdmin ? (
            <button
              onClick={() => navigate("/admin")}
              className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Admin Panel
            </button>
          ) : (
            <></>
          )}

          {location.pathname === "/" ? (
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/protected");
                } else {
                  logIn();
                }
              }}
              className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              User Page
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Public Page
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={logOut}
              className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={logIn}
              className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
