import { useState } from "react";
import { auth } from "../lib/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const signup = async (email, password, userName) => {
    setError(null);
    setIsPending(true);
    // check if username already exist if true throw error else signup users
    //1. doesUserName NOT exist ? ==> fetch collection('users')-> where ('username' '==' userName)
    //2. map the data then if(username == userName).length > 0
    // then it exist ==> throw error 'username already exist'
    // else
    try {
      // 3.signup user
      const createdUserResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async ({ user }) => {
        await updateProfile(user, {
          displayName: userName,
        });
        // 4. add user information to collection('users) using createdUserResult
        //  get the  collection = users add {userID, displayName:username,emailaddress dateCreated:Date.now}
        //   dispatch login function
        dispatch({ type: "LOGIN", payload: user });
        router.push("/");
      });   
      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { signup, error, isPending };
};
