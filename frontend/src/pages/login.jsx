import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAppContext } from "../appContexts";
import "../styles/loginRegister.css"

function Login() {
  const { setAuthenticatedUser } = useAppContext();
  const { authenticatedUser } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await loginUser(username, password, setAuthenticatedUser, authenticatedUser);
      navigate("/");

      setAuthenticatedUser(true);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-register">
      <h1>Login</h1>

      <div className="form">
        <input
          className="lr-form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="lr-form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Login
        </button>
      </div>

      <button onClick={() => navigate("/register")}>
        Create account
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;