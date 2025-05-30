import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "My Projects", to: "/projects" },
  { label: "Pricing", to: "/pricing" },
  { label: "Help", to: "/help" },
];

export default function NavLinks({ isMobile = false, onLinkClick }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  if (isMobile) {
    return (
      <ul className="flex flex-col space-y-4 font-medium">
        {navLinks.map(({ label, to }) => {
          const active = isActive(to);
          return (
            <li key={to}>
              <Link
                to={to}
                onClick={onLinkClick}
                className={`block px-3 py-2 rounded ${
                  active
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
      {navLinks.map(({ label, to }) => {
        const active = isActive(to);
        return (
          <li key={to}>
            <Link
              to={to}
              className={`py-2 px-1 relative group ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              } transition-colors duration-200`}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative z-10">{label}</span>
              {active ? (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></span>
              ) : (
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}