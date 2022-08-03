import React from "react";
import Link from "next/link";
const Login = () => {
  return (
    <div className="container">
      <form className="form">
        <div className="demo-details">
          <p>Demo account 🧑:</p>
          <span>Email: johndoe@gmail.com</span>
          <span>Password: password</span>
        </div>
        <h2>Login</h2>
        <label>
          <span>Email:</span>
          <input type="email" required placeholder="johndoe@gmail.com" />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required placeholder="password" />
        </label>
        <button className="btn margin-top-sm">Log in</button>
        <h3 className="signup-message">
          Don&apos;t have an account ? sign up here{"  "}
          <Link href="/Signup">Sign up</Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
