import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AttendanceList from "./pages/Attendance/AttendanceList";
import LeaveList from "./pages/Leave/LeaveList";
import OfficeList from "./pages/Office/OfficeList";
import ProjectList from "./pages/Project/ProjectList";
import UserList from "./pages/User/UserList";
import TaskList from "./pages/Task/TaskList";
import Topbar from "./components/Topbar";
// import Permissions from "./pages/Permission/"

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
              <div className="min-h-screen flex">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Topbar />
                  <main className="p-4 space-y-4">
                    <div className="min-h-screen bg-gray-50 p-8 rounded-2xl">
                      <Outlet />
                    </div>
                  </main>
                </div>
              </div>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendanceList />} />
            <Route path="/leaves" element={<LeaveList />} />
            <Route path="/offices" element={<OfficeList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/users" element={<UserList />} />
            {/* <Route path="/permissions" element={<Permissions />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
