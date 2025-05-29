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
              className={`relative group transition-colors duration-200 ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              <span>{label}</span>
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-blue-500 rounded-full transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}