import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Admin from '../pages/Admin';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 bg-white/80 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        {/* <Outlet /> */}
        <Admin />
      </main>
    </div>
  );
};

export default Layout;