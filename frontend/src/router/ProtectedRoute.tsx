import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "../modules/auth/auth-hooks";
import type { Role } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { data: session, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 py-16 text-sm text-steel">
        Проверяем сессию...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={session.role === "ROLE_ADMIN" ? "/admin" : "/dashboard"} replace />;
  }

  return <Outlet />;
}
