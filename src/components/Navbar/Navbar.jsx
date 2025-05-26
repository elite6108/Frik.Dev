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
      <nav className="fixed w-full z-50 top-0 left-0 backdrop-blur bg-white/80 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3.5 flex justify-between items-center">
          <Logo />
          <NavLinks />

          <div className="flex items-center space-x-3">
            <BuilderCTA />
            <ThemeToggle />
            <AuthButtons />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiOutlineX size={24} />: <HiOutlineMenu size={24} />}
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