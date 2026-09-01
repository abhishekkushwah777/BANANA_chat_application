import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await registerUser(username, email, password);

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-register">
      <h1>Register</h1>

      {error && <p>{error}</p>}

      <div className="form">
        <input
        type="text"
          className="lr-form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
        type="text"
          className="lr-form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          className="lr-form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Register
        </button>
      </div>

      <button onClick={() => navigate("/login")}>
        Already have an account? Login
      </button>
    </div>
  );
}

export default Register;