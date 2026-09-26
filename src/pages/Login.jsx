import {
  useState
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Login() {
  const {
    login
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage(
        "Please enter your email and password."
      );
      return;
    }

    const success =
      login(
        email,
        password
      );

    if (!success) {
      setMessage(
        "Invalid email or password."
      );
      return;
    }

    navigate(location.state?.from || "/");
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          BR
        </div>

        <span className="small-heading">
          WELCOME BACK
        </span>

        <h1>
          Sign in
        </h1>

        <p>
          Access your personal reading community.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {message && (
            <div className="form-error">
              {message}
            </div>
          )}

          <button
            className="primary-button full-width"
            type="submit"
          >
            Sign In
          </button>

        </form>

        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Login;