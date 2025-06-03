import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/builder" replace />;
  }

  return <Outlet />;
}