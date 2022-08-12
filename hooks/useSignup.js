import { useState } from "react";
import { auth } from "../lib/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";

import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
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
    const q = query(
      collection(db, "users"),
      where("username", "==", userName.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    const userNameTaken = querySnapshot.docs.length > 0;

    if (!userNameTaken) {
      console.log(userNameTaken);
      try {
        // 3.signup user
        await createUserWithEmailAndPassword(auth, email, password).then(
          async ({ user }) => {
            await updateProfile(user, {
              displayName: userName,
            });
            await addDoc(collection(db, "users"), {
              userId: user.uid,
              username: userName.toLowerCase(),
              emailAddress: email.toLowerCase(),
              dateCreated: Date.now(),
            });

            // add to database

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
  // check if username already exist if true throw error else signup users
  //1. doesUserName NOT exist ? ==> fetch collection('users')-> where ('username' '==' userName)
  //2. map the data then if(username == userName).length > 0
  // then it exist ==> throw error 'username already exist'
  // else

  return { signup, error, isPending };
};
