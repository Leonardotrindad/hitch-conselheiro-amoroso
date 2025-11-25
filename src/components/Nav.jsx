import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-full py-2 sm:py-3 flex justify-center items-center absolute top-0 left-0 z-10 bg-transparent">
      <div className="container mx-auto flex justify-center items-center px-4 sm:px-6">
        <Link to="/">
          <img
            src="/logo_hitch.png"
            alt="Logo"
            className="h-12 sm:h-14 md:h-16 w-auto"
          />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
