import { Link, useLocation } from "react-router-dom";

const FOOTER_CONFIG = {
  "/": {
    title: ["Ready to start building?", "Create your first Frik-powered website today."],
    description:
      "No coding skills required. Just describe what you want, and watch your website come to life.",
    buttonText: "Sign up for free",
    buttonClass: "bg-white text-blue-600",
    wrapperClass: "bg-blue-600",
  },
  "/pricing": {
    title: ["Ready to start building amazing websites?"],
    description:
      "Join thousands of developers who are already creating stunning websites with Frik.",
    buttonText: "Get Started For Free",
    buttonClass: "bg-white text-blue-600 hover:bg-blue-50",
    wrapperClass: "bg-gradient-to-r from-blue-600 to-indigo-600",
  },
};

export default function Footer() {
  const { pathname } = useLocation();
  const content = FOOTER_CONFIG[pathname];
  const isAuthenticated = true;

  if (!content) return null;

  return (
    <footer className={`w-full py-16 px-4 sm:py-20 sm:px-6 lg:px-8 text-center ${content.wrapperClass}`}>
      <h2 className="text-3xl font-bold text-white sm:text-4xl space-y-2 w-2/3 md:w-[55%] mx-auto">
        {content.title.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mt-4 text-lg text-blue-100 w-2/3 md:w-1/3 mx-auto">{content.description}</p>

      {(location.pathname === '/' && !isAuthenticated ) && <Link
        to="/signup"
        className={`mt-8 inline-block px-8 py-3 rounded-md font-medium transition duration-200 hover:scale-101 ${content.buttonClass}`}
      >
        {content.buttonText}
      </Link>}
    </footer>
  );
}