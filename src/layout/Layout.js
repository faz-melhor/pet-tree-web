import React from "react";

const Layout = (props) =>
  <div className="flex-1 items-center h-screen w-full bg-gray-200">
    {props.children}
  </div>;

export default Layout;
