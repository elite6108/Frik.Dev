import { Link } from "react-router-dom";
import { FaCode } from 'react-icons/fa';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 group">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <FaCode size={22} className="text-white"/>
      </div>
      <span className="self-center text-lg sm:text-xl font-extrabold whitespace-nowrap bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-indigo-400 group-hover:to-purple-500 dark:group-hover:from-blue-300 dark:group-hover:via-indigo-300 dark:group-hover:to-purple-400 transition-all duration-300">
        Frik
      </span>
    </Link>
  );
}