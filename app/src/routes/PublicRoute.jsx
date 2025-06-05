import * as ReactRouterDom from 'react-router-dom';
const { Navigate, Outlet } = ReactRouterDom;

export default function PublicRoute({ isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/builder" replace />;
  }

  return <Outlet />;
}