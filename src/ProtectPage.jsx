import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/authContext"

export const ProtectPage = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } 

  return <Outlet />;
}
