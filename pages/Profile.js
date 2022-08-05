import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
const Profile = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      return;
    }
  });

  return <div>profile</div>;
};

export default Profile;
