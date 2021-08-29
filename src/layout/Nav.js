import React from "react";
import { NavLink, useHistory } from "react-router-dom";

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

function Nav({ api }) {
  const history = useHistory();

  const handleSignOut = () => {
    api.Auth.signout();
    history.push('/signin')
  }

  return (
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
        <li className='float-right' style={{marginLeft: 'auto', marginRight: '25px'}}>
          <button className="bnt font-bold" onClick={() => handleSignOut()}> sign out </button>
        </li>
      </ul>
    </nav >
  );
}

export default Nav;
