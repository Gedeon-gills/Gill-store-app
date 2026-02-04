import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const user = localStorage.getItem('user');
  
  if (!user || user === 'undefined') {
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    try {
      const userData = JSON.parse(user);
      if (userData.role !== requiredRole) {
        return <Navigate to="/" replace />;
      }
    } catch {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;