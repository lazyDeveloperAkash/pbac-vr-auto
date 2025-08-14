import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import Attendance from "./pages/Attendance"
import Department from "./pages/Department"
import Leave from "./pages/Leave"
import Office from "./pages/Office"
import Project from "./pages/Project"
import Task from "./pages/Task"
import Users from "./pages/Users"
import Permissions from "./pages/Permissions"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">
                  <Outlet />
                </main>
              </div>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/departments" element={<Department />} />
            <Route path="/leaves" element={<Leave />} />
            <Route path="/offices" element={<Office />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/users" element={<Users />} />
            <Route path="/permissions" element={<Permissions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
