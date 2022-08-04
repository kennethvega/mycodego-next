import { useAuthContext } from "./useAuthContext";

import { useState } from "react";
// firebase imports
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    setIsPending(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      });
  };

  return { login, error, isPending };
};
