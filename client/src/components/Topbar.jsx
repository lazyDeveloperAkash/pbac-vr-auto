import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'

export default function Topbar() {
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
      <div className="font-semibold">Welcome, {user?.name || 'Guest'}</div>
      <button onClick={() => dispatch(logout())} className="px-3 py-1 rounded-lg border">Logout</button>
    </header>
  )
}