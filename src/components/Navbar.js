import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase"; // Replace with your Firebase auth instance
// import "./Navbar.css"; // Optional for custom styles

const Navbar = ({ user }) => {
  const handleSignOut = async () => {
    await auth.signOut();
    window.location.href = "/"; // Redirect to home after sign-out // replace with home page
  };

  return (
    <header className="navbar px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo Section on clicking this redirects to the home page */}
        <Link to="/">
          <img src="/logo.png" alt="logo" width="144" height="30" />
        </Link>

        {/* Links Section */}
        <div className="flex items-center gap-5 text-black">
          {user ? (
            <>
              {/* Create Button // link to the page where the user can add startup ideas form page basically */}
              <Link to="/startup/create" className="btn btn-create">
                Create
              </Link>

              {/* Logout Button */}
              <button onClick={handleSignOut} className="btn btn-logout">
                Logout
              </button>

              {/* User Profile Picture */}
              <Link to={`/user/${user.uid}`} className="user-profile">
                <img
                  src={user.photoURL || "/default-avatar.png"} // Default avatar if no photo
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="hidden sm:block">
                  {user.displayName || "User"}
                </span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => (window.location.href = "/login")}
              className="btn-login"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
