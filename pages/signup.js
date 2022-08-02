import React from "react";

const signup = () => {
  return (
    <div className="container">
      <form className="form">
        <h2>Sign up</h2>
        <label>
          <span>Email:</span>
          <input type="email" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required />
        </label>
        <label>
          <span>Display name:</span>
          <input type="text" required />
        </label>
        <button className="btn">Sign up</button>
      </form>
    </div>
  );
};

export default signup;
