import React from "react";
import Navbar from "./Navbar";
import Theme from "./Theme";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Theme />
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
