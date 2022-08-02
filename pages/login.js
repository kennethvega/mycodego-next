import React from "react";
import Link from "next/link";
const login = () => {
  return (
    <div className="container">
      <form className="form">
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
          <Link href="/signup">Sign up</Link>
        </h3>
      </form>
    </div>
  );
};

export default login;
