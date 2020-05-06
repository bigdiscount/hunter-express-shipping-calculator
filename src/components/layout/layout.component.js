import React from "react";
import Header from "./_header.coponent";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-primary">
        <Header />
      </div>
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
