import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getStoredSession } from "../modules/auth/auth-storage";
import type { Role } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const session = getStoredSession();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
