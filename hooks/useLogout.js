import { auth } from "../lib/firebase-config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/router";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        console.log("user signed out");
        router.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
