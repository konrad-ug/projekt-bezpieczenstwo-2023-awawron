import Protected from "./components/Protected";
import Public from "./components/Public";
import Nav from "./components/Nav";

import useAuth from "./hooks/useAuth";

function App() {
  const [isLoggedIn, token, logOut] = useAuth();
  return (
    <div className="bg-gray-200 min-h-screen">
      <Nav />

      <div className="flex flex-col items-center min-h-screen bg-gray-200">
        {isLoggedIn ? (
          <div>
            <Protected token={token} />

            <button
              onClick={logOut}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log out
            </button>
          </div>
        ) : (
          <Public />
        )}
      </div>
    </div>
  );
}

export default App;
