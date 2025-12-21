import { Link } from "react-router";

const StartPage = () => {
  

return (
    <>
      <h1>
        Welcome to <strong>TMDB Client!</strong>! Browse <Link to="/movies">Movies</Link>, or view your{" "}
        <Link to="/profile">Profile</Link>.
      </h1>
      <h2>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to view movies!
      </h2>
    </>
  );
};


export default StartPage;
