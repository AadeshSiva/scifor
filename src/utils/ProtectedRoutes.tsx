import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/AuthContext";
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
