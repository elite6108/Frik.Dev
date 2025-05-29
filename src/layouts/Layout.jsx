import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Admin from '../pages/Admin';
import Builder from '../pages/Builder';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 bg-white/80 dark:bg-gray-900 transition-colors duration-300">
        {/* <Outlet /> */}
        <Builder />
        {/* <Admin /> */}
      </main>
    </div>
  );
};

export default Layout;