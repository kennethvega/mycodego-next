import React, { useState } from "react";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import Loader from "../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const { login, error, isPending } = useLogin();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="container">
      <form className="form" onClick={() => handleSubmit}>
        <div className="demo-details">
          <p>Demo account 🧑:</p>
          <span>Email: johndoe@gmail.com</span>
          <span>Password: password</span>
        </div>
        <h2>Login</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {isPending && (
          <button className="btn margin-top-sm" disabled>
            Loading <Loader />
          </button>
        )}
        {!isPending && <button className="btn margin-top-sm">Login</button>}
        <h3 className="signup-message">
          Don&apos;t have an account ? sign up here{"  "}
          <Link href="/Signup">Sign up</Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
