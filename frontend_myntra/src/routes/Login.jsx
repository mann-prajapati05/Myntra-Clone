import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isAdminActions } from "../store";
axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLogin } = useOutletContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_COMMON_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
      const { userType } = result.data;
      if (!userType) {
        setError(result.data?.message || "Invalid email or password.");
        return;
      }
      if (userType === "admin") dispatch(isAdminActions.setAdminState(true));
      else dispatch(isAdminActions.setAdminState(false));
      setLogin(true);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      console.log("login error", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ minWidth: "320px", maxWidth: "420px", width: "100%" }}
      >
        <h3 className="card-title mb-3 text-center">Login</h3>
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
