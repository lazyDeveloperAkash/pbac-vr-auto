import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import usePermission from '../hooks/usePermission'

const Item = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-xl hover:bg-gray-100 ${
        isActive ? 'bg-gray-200' : ''
      }`
    }
  >
    {label}
  </NavLink>
)

export default function Sidebar() {
  const user = useSelector((s) => s.auth.user)

  // ✅ Call hook once for each module
  const attendancePerm = usePermission('Attendance')
  const deptPerm = usePermission('Department')
  const leavePerm = usePermission('Leave')
  const officePerm = usePermission('Office')
  const projectPerm = usePermission('Project')
  const taskPerm = usePermission('Task')
  const userPerm = usePermission('User')

  const modules = [
    { key: 'Dashboard', path: '/', guard: true },
    { key: 'Attendance', path: '/attendance', guard: attendancePerm.canRead },
    { key: 'Department', path: '/departments', guard: deptPerm.canRead },
    { key: 'Leave', path: '/leaves', guard: leavePerm.canRead },
    { key: 'Office', path: '/offices', guard: officePerm.canRead },
    { key: 'Project', path: '/projects', guard: projectPerm.canRead },
    { key: 'Task', path: '/tasks', guard: taskPerm.canRead },
    {
      key: 'User',
      path: '/users',
      guard: user?.role === 'ADMIN' || userPerm.canRead,
    },
    { key: 'Permissions', path: '/permissions', guard: user?.role === 'ADMIN' },
  ]

  return (
    <aside className="w-64 shrink-0 p-4 bg-white border-r border-gray-100 min-h-screen">
      <div className="text-xl font-bold mb-4">Office Suite</div>
      <nav className="space-y-1">
        {modules.filter((m) => m.guard).map((m) => (
          <Item key={m.key} to={m.path} label={m.key} />
        ))}
      </nav>
    </aside>
  )
}
