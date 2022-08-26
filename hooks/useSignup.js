import { useState } from "react";
import { auth } from "../lib/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
import { checkUserWithUsername } from "../lib/firebase-config";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase-config";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const signup = async (email, password, userName) => {
    setError(null);
    setIsPending(true);
    // check if username already exist
    const userNameTaken = await checkUserWithUsername(userName);

    if (!userNameTaken) {
      try {
        // 3.signup user
        await createUserWithEmailAndPassword(auth, email, password).then(
          async ({ user }) => {
            await updateProfile(user, {
              displayName: userName,
            });
            // add to database users
            await setDoc(doc(db, "users", `${user.uid}`), {
              userId: user.uid,
              username: userName.toLowerCase(),
              emailAddress: email.toLowerCase(),
              dateCreated: Date.now(),
              bio: "",
              photoURL: "",
            });
       

            dispatch({ type: "LOGIN", payload: user });
            router.push("/");
          }
        );
        setIsPending(false);
        setError(null);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    } else {
      setError("username is already taken. please try again");
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
