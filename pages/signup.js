import React from "react";

const signup = () => {
  return (
    <div className="container">
      <form className="form">
        <h2>Sign up</h2>
        <label>
          <span>Email:</span>
          <input type="email" required placeholder="johndoe@gmail.com" />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required placeholder="password" />
        </label>
        <label>
          <span>Display name:</span>
          <input type="text" required placeholder="john" />
        </label>
        <button className="btn margin-top-sm">Sign up</button>
      </form>
    </div>
  );
};

export default signup;
