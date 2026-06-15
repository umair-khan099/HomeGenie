import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="border-b-2 border-zinc-700 flex gap-2">
      <Link to="/login">Login</Link>
      <Link to="/signup">Sogin</Link>
    </div>
  );
};

export default NavBar;
