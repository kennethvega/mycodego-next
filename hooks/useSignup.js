import { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext;

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async ({ user }) => {
          await updateProfile(user, {
            displayName: displayName,
          });
          dispatch({ type: "LOGIN", payload: user });
        }
      );
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, signup, isPending };
};
