import * as ReactRouterDom from "react-router-dom";
const { Link } = ReactRouterDom;
export default function Hero() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-16 text-center">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Build websites with</span>
        <span className="block text-blue-600">Conversational AI</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Create stunning, fully functional websites through natural language
        prompts. Our Frik platform turns your ideas into code instantly.
      </p>
      <Link
        to="/builder"
        className="w-[70%] sm:w-1/3 lg:w-[20%] mx-auto flex items-center justify-center px-8 py-3 font-medium rounded-md text-white bg-blue-600 hover:scale-101 md:py-4 md:text-lg md:px-10 transition-transform duration-300 mt-5"
      >
        Start Building
      </Link>
    </div>
  );
}