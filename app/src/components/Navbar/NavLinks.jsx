import * as ReactRouterDom from "react-router-dom";
const { NavLink } = ReactRouterDom;

export default function NavLinks({ isMobile = false, onLinkClick }) {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "My Projects", to: "/projects" },
    { label: "My Subscriptions", to: "/subscriptions" },
    { label: "Support", to: "/support" },
  ];

  if (isMobile) {
    return (
      <ul className="flex flex-col space-y-4 font-medium">
        {navLinks.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="hidden md:flex items-center space-x-8 font-medium text-sm">
      {navLinks.map(({ label, to }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `py-2 px-1 relative group ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              } transition-colors duration-200`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{label}</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}