import React from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
const Layout = ({ children }) => {
  const { authIsReady } = useAuthContext();
  return (
    <div>
      {authIsReady && (
        <>
          <header>
            <Navbar />
          </header>

          <main>{children}</main>
          <footer>Footer</footer>
        </>
      )}
    </div>
  );
};

export default Layout;
