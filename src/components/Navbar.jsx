import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, role, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-blue-300 transition-colors duration-200"
            onClick={closeMenu}
          >
            AML/CFT
          </Link>

          {/* Hamburger Menu Button - Visible on mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-blue-700 rounded transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {!token ? (
              <>
                <Link
                  to="/"
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/admin/login"
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Admin Login
                </Link>
                <Link
                  to="/start"
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Start Exam
                </Link>
              </>
            ) : role === "admin" ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/exam"
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Exam
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1 hover:text-blue-300 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Visible when hamburger is clicked */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden mt-4 pb-2 space-y-2`}
        >
          {!token ? (
            <>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/admin/login"
                className="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Admin Login
              </Link>
              <Link
                to="/start"
                className="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Start Exam
              </Link>
            </>
          ) : role === "admin" ? (
            <>
              <Link
                to="/admin/dashboard"
                className="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/exam"
                className="block py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                onClick={closeMenu}
              >
                Exam
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;