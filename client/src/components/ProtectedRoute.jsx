import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const user = useSelector((s) => s.auth.user)

  // If no user → go to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // If logged in → render child route
  return <Outlet />
}
