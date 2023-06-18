import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Nav = ({ token, isLoggedIn, isAdmin, logIn, logOut }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">My App</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* Add your navigation links here */}
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={logOut}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={logIn}
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Login
            </button>
          )}

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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
