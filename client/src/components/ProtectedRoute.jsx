eimport { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const user = useSelector((s) => s.auth.user);
  const token = localStorage.getItem("token");

  // If no user → go to login
  if (!user && !token) {
    return <Navigate to="/login" replace />
  }else if(!user && token){
    return <div className="w-[100vw] h-[100vh] flex items-center justify-center">Loading...</div>
  }else{
    // If logged in → render child route
    return <Outlet />
  }
}
