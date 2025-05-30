import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";
import BuilderCTA from "./BuilderCTA";
import MobileMenu from "./MobileMenu";
import { HiOutlineMenu, HiOutlineX  } from "react-icons/hi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full fixed z-50 shadow-md backdrop-blur bg-gra-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-800 transition-all duration-300">
        <div className="mx-auto px-4 md:px-15 py-2 sm:py-3.5 flex justify-between items-center">
          <Logo />
          <NavLinks />

          <div className="flex items-center space-x-3">
            <BuilderCTA />
            <ThemeToggle />
            <AuthButtons />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
      />
    </>
  );
}