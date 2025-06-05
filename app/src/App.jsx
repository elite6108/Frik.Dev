import * as ReactRouterDom from 'react-router-dom';
const { Routes, Route, useNavigate, useLocation } = ReactRouterDom;
import ReactDOM from "react-dom/client";

import Layout from './layouts/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Builder from './pages/Builder';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Subscriptions from './pages/Subscriptions';
import Settings from './pages/Settings';
import Support from './pages/Support';
import MyProjects from './pages/MyProjects';
// Import BrowserRouter to provide routing context

const isAuthenticated = true;

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="subscriptions" element={<Subscriptions />} />

        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="builder" element={<Builder />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="projects" element={<MyProjects />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}