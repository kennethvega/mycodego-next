import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const { login, error, isPending } = useLogin();
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      return;
    } else {
      router.push("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="demo-details">
          <p>Demo account 🧑:</p>
          <span>Email:johndoe@gmail.com</span>
          <span>Password:password</span>
        </div>
        <h2>Login</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
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
          <button className="btn margin-top-sm center-items" disabled>
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
