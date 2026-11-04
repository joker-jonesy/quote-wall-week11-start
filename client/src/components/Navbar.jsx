import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); // clears the token from localStorage and the user from state
    navigate("/login"); // ...and take them to the login page
  }

  return (
    <header className="navbar">
      <strong className="brand">Quote Wall</strong>
      <nav>
        <NavLink to="/" end>
          Wall
        </NavLink>
        <NavLink to="/favorites">My Favorites</NavLink>
      </nav>
      <div className="navbar-user">
        <span className="muted">{user.email}</span>
        <button className="secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
