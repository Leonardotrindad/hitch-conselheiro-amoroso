import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-full bg-[#FFFCFB] pt-2 flex justify-center items-center">
      <div className="container mx-auto flex  justify-center items-center px-6">
        <Link to="/">
          <img
            src="/public/logo_hitch.png"
            alt="Logo"
            className="h-24 w-auto"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
