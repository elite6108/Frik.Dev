import * as ReactRouterDom from 'react-router-dom';
const { Navigate, Outlet } = ReactRouterDom;

export default function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}