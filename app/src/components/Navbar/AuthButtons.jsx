
import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;

export default function AuthButtons({ isMobile = false, onClick }) {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between px-4">
        <Link
          to="/login"
          onClick={onClick}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-base px-4 py-2 transition-all duration-300 hover:translate-x-1"
        >
          Sign In
        </Link>
        <Link
          to="/signup"
          onClick={onClick}
          className="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium rounded-md text-base px-4 py-2 transition-all duration-300 shadow-sm hover:shadow-md outline-none"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex space-x-3">
      <Link
        to="/login"
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm px-4 py-2 transition-all duration-300 hover:scale-105"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2 transition-all duration-200 shadow-sm hover:scale-105"
      >
        Sign Up
      </Link>
    </div>
  );
}