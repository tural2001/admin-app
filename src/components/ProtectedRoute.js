import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Dashboard';

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" />}
    />
  );
}

// Usage:
<Route
  path="/dashboard"
  element={<ProtectedRoute element={<Dashboard />} />}
/>;

export default ProtectedRoute;
