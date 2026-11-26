import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function GuestRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "var(--muted)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (user) {
    const target = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
}

export default GuestRoute;