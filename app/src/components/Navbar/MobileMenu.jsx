import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;
import NavLinks from "./NavLinks";
import BuilderCTA from "./BuilderCTA";
import AuthButtons from "./AuthButtons";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

export default function MobileMenu({ isOpen, onClose, isAuthenticated }) {
  const wrapperClasses = `fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`;

  const menuItemClasses =
    "flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={wrapperClasses}>
        <div className="p-4 space-y-6">
          <NavLinks isMobile onLinkClick={onClose} />
          <BuilderCTA isMobile onClick={onClose} />

          {isAuthenticated ? (
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2">
                Signed in as{" "}
                <span className="font-semibold text-gray-900 dark:text-white">H</span>
              </p>

              <Link to="/settings" onClick={onClose} className={menuItemClasses}>
                <HiOutlineCog className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                Account Settings
              </Link>

              <button onClick={onClose} className={menuItemClasses}>
                <HiOutlineLogout className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                Sign Out
              </button>
            </div>
          ) : (
            <AuthButtons isMobile onClick={onClose} />
          )}
        </div>
      </aside>
    </>
  );
}