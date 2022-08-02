import React from "react";

const login = () => {
  return (
    <div className="container">
      <form className="form">
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input type="email" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required />
        </label>
        <button className="btn">Log in</button>
      </form>
    </div>
  );
};

export default login;
