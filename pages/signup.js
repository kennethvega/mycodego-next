import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useSignup } from "../hooks/useSignup";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, signup, isPending } = useSignup();
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
    signup(email, password, displayName);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
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
        <label>
          <span>Display name:</span>
          <input
            type="text"
            required
            placeholder="john"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {isPending && (
          <button className="btn margin-top-sm center-items" disabled>
            Loading <Loader />
          </button>
        )}
        {!isPending && <button className="btn margin-top-sm">Sign up</button>}
      </form>
    </div>
  );
};

export default Signup;
