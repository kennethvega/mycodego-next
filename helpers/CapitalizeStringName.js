import { useEffect, useState } from "react";

const CapitalizeStringName = (user) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const username = user?.username.split(" ");
    const displayName = username
      .map((dn) => {
        return dn[0].toUpperCase() + dn.substring(1);
      })
      .join(" ");
    setName(displayName);
  }, [user]);
  return name;
};

export default CapitalizeStringName;
