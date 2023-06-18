import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Main from "./components/Main";
import Nav from "./components/Nav";
import AdminPage from "./components/AdminPage";

import useAuth from "./hooks/useAuth";

function App() {
  const [isLoggedIn, token, logIn, logOut, isAdmin] = useAuth();

  return (
    <>
      <Nav
        token={token}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        logIn={logIn}
        logOut={logOut}
      />
      <div className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center min-h-screen bg-gray-200">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  token={token}
                  logIn={logIn}
                  logOut={logOut}
                  isAdmin={isAdmin}
                />
              }
            />
            <Route
              path="admin"
              element={<AdminPage token={token} isAdmin={isAdmin} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
