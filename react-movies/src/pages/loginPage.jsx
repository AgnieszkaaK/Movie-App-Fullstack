
import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router"; // ← fix imports
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    // If authenticate is async, it should update isAuthenticated when done
    context.authenticate(userName, password);
  };

  const location = useLocation();

  // Default fallback changed to /movies/upcoming
  const { from } = location.state
    ? { from: location.state.from.pathname }
    : { from: "/movies/upcoming" };

  // once authenticated, this redirects
  if (context.isAuthenticated === true) {
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages</p>

      <input
        id="username"
        placeholder="user name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={login}>Log in</button>

      <p>
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </p>
    </>
  );
};

export default LoginPage;
