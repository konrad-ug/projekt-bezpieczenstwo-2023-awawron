import Protected from "./components/Protected";
import Public from "./components/Public";

import useAuth from "./hooks/useAuth";

function App() {
  const [isLoggedIn, token, logOut] = useAuth();
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Protected token={token} />
          <button onClick={logOut}> Log out </button>
        </div>
      ) : (
        <Public />
      )}
    </div>
  );
}

export default App;
