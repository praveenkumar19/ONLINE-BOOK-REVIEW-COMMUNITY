import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const {
    user,
    logout
  } = useAuth();

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="brand">
          <span className="brand-icon">
            BR
          </span>

          <span>
            BookReview
          </span>
        </Link>

        <nav className="nav-links">

          <NavLink
            to="/"
            className="nav-link"
          >
            Home
          </NavLink>

          <NavLink
            to="/discover"
            className="nav-link"
          >
            Discover
          </NavLink>

          <NavLink
            to="/want-to-read"
            className="nav-link"
          >
            Want to Read
          </NavLink>

          <NavLink
            to="/favorites"
            className="nav-link"
          >
            Favorites
          </NavLink>

        </nav>

        <div className="nav-actions">

          <button
            className={`theme-toggle ${darkMode ? "dark" : "light"}`}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            type="button"
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb">
                <span className="theme-toggle-icon">
                  {darkMode ? "☀️" : "🌙"}
                </span>
              </span>
            </span>
            <span className="theme-toggle-text">
              {darkMode ? "Light" : "Dark"}
            </span>
          </button>

          {user ? (
            <>
              <Link
                to="/notifications"
                className="icon-button"
              >
                🔔
              </Link>

              <Link
                to="/profile"
                className="profile-mini"
              >
                <span className="avatar-small">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar-small-image"
                    />
                  ) : (
                    user.name
                      ?.charAt(0)
                      .toUpperCase()
                  )}
                </span>

                <span>
                  {user.name}
                </span>
              </Link>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="login-nav-button"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;