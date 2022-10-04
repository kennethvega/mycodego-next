import React from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import Footer from "./Footer";
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
          <footer className="container center-items">
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
