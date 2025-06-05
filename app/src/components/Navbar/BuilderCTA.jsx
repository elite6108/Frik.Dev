import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;
import { FaArrowRight } from "react-icons/fa";

export default function BuilderCTA({ isMobile = false, onClick }) {
  if (isMobile) {
    return (
      <Link
        to="/builder"
        onClick={onClick}
        className="w-full inline-flex justify-center items-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium rounded-md px-4 py-2 text-base shadow transition"
      >
        <span className="mr-2 font-medium text-base">Build your app now</span>
        <FaArrowRight size={16} />
      </Link>
    );
  }

  return (
    <Link
      to="/builder"
      className="hidden md:inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm px-4 py-2 rounded-md shadow hover:shadow-md transition hover:scale-102 hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700"
    >
      <span className="mr-2 font-medium text-base">Build your app now</span>
      <FaArrowRight size={16} />
    </Link>
  );
}