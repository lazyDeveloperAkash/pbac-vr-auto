import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const user = useSelector((s) => s.auth.user);
  const token = localStorage.getItem("token");

  // If no user → go to login
  if (!user && !token) {
    return <Navigate to="/login" replace />
  }

  // If logged in → render child route
  return <Outlet />
}
