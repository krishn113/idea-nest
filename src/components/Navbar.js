import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";

const Navbar = ({ user }) => {
  const handleSignOut = async () => {
    await auth.signOut();
    window.location.href = "/"; // Redirects to home after signout.
  };

  return (
    <header className="px-2 py-3 bg-white shadow-md text-pink-100">
      <nav className="flex justify-between items-center sticky top-0 overflow-hidden">
        {/* Logo Section */}
        <Link to="/" className="flex items-center text-pink-400 text-xl font-serif font-semibold">
          IdeaNest
        </Link>

        {/* Links Section */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {/* Explore Button */}
                            <Link
                to="/explore"
                className="px-4 py-2 text-sm font-medium rounded-md text-pink-400"
              >
                Explore
              </Link>
              {/* Create Button */}
              <Link
                to="/startup/create"
                className="px-4 py-2 text-sm font-medium rounded-md text-pink-400"
              >
                Create
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleSignOut}
                className="btn"
              >
                Logout
              </button>

              {/* User Profile Picture */}
              <Link to={"/profile"} className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/avatar.jpg"}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
              </Link>
            </>
          ) : (
            <>
              {/* Create Button */}
              <Link
                to="/explore"
                className="px-4 py-2 text-sm font-medium rounded-md text-pink-400"
              >
                Create
              </Link>

              {/* Login Button */}
              <button
                onClick={() => (window.location.href = "/login")}
                className="btn"
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
