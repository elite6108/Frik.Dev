import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Admin from '../pages/Admin';
import Builder from '../pages/Builder';
import SignIn from '../pages/SignIn';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 bg-white/80 dark:bg-gray-900 transition-colors duration-300 p-8">
        {/* <Outlet /> */}
        {/* <Admin /> */}
        {/* <Builder /> */}
        <SignIn onSubmit={(values) => console.log(values)} isLoading={console.log("loading")} error={console.log("err")} handleGitHubSignIn={console.log("github")} />
      </main>
    </div>
  );
};

export default Layout;