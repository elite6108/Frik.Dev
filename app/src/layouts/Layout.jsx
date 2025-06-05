import * as ReactRouterDom from 'react-router-dom';
const { Outlet, useLocation } = ReactRouterDom;
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

export default function Layout () {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`${location.pathname === '/' && location.pathname !== '/builder' ? "bg-gray-50" : "bg-gray-50 dark:bg-gray-900"} ${location.pathname === '/builder' ? "bg-gray-50 dark:bg-gray-950" : ""} flex-1 transition-colors duration-300 p-4 md:p-8`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};