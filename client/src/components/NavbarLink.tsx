import React from "react";
import { NavLink } from "react-router-dom";

interface INavbarLink {
  activeClass: string,
  normalClass: string,
  to: string,
  title: string
}

const NavbarLink = ({activeClass, normalClass, to, title}: INavbarLink) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? activeClass : normalClass
      }
      to={to}
    >
      {title}
    </NavLink>
  );
};

export default NavbarLink