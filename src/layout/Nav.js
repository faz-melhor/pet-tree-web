import React from "react";
import { NavLink } from "react-router-dom";

const navs = [
  {
    path: "/",
    name: "trees"
  },
  {
    path: "/users",
    name: "users"
  },
]

const Nav = () => (
  <nav style={{ backgroundColor: "rgb(88,195,21)" }} className="p-4 text-green-200 shadow-lg" >
    <ul className="flex space-x-6 justify-left font-bold text-2xl items-end">
      <h1 className="text-white text-5xl">pet tree</h1>
      {navs.map((navItem, i) => (
        <li key={i}>
          <NavLink exact to={navItem.path} activeClassName="text-white">
            {navItem.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav >
);

export default Nav;
