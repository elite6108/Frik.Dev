
import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;

export default function NotFound() {
  return (
    <div className="mt-15 pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="w-1/2 md:w-[33%] inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 hover:scale-101 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}