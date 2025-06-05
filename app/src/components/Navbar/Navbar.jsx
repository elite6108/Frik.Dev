import { useState, useRef, useEffect } from "react";
import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import BuilderCTA from "./BuilderCTA";
import MobileMenu from "./MobileMenu";
import { HiOutlineMenu, HiOutlineX, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAuthenticated = true;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarButtonClass =
    "h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 outline-none cursor-pointer";

  const dropdownMenuClass =
    "absolute right-0 top-full mt-2 w-45 rounded-lg shadow-lg bg-white dark:bg-gray-800 outline-none z-50 transition-all duration-200 transform origin-top-right";

  const dropdownItemClass =
    "flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer";

  return (
    <>
      <nav className="w-full fixed z-50 shadow-md backdrop-blur bg-white/70 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 transition-all duration-300">
        <div className="mx-auto px-4 md:px-15 py-2 sm:py-3.5 flex justify-between items-center">
          <Logo />
          <NavLinks />

          <div className="flex items-center space-x-3">
            <BuilderCTA />
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="hidden md:flex items-center relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={avatarButtonClass}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  H
                </button>

                <div
                  className={`${dropdownMenuClass} ${
                    dropdownOpen
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1">
                    <Link
                      to="/settings"
                      className={dropdownItemClass}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <HiOutlineCog className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className={`${dropdownItemClass} group w-full`}
                    >
                      <HiOutlineLogout className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <AuthButtons />
            )}

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer text-gray-600 dark:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}