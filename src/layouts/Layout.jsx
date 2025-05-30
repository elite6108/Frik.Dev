import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Admin from '../pages/Admin';
import Builder from '../pages/Builder';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-1 bg-white/80 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-8 min-h-screen">
        {/* <Outlet /> */}
        {/* <Admin /> */}
        {/* <Builder /> */}
        {/* <SignIn onSubmit={(values) => console.log(values)} isLoading={console.log("loading")} error={console.log("err")} handleGitHubSignIn={console.log("github")} /> */}
        {/* <SignUp onSubmit={(values) => console.log(values)} isLoading={console.log("loading")} error={console.log("err")} handleProviderSignUp={console.log("github")} /> */}
        <ForgotPassword onSubmit={(email) => console.log(email)} isLoading={console.log("loading")} error={console.log("err")} />
        {/* <ResetPassword onSubmit={(data) => console.log(data)} isLoading={console.log("loading")} error={console.log("err")} /> */}
      </main>
    </div>
  );
};

export default Layout;