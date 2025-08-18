import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { LogOut } from 'lucide-react'

export default function Topbar() {
  const dispatch = useDispatch()
  const user = useSelector(s => s.auth.user)
  
  return (
    <div className="bg-gray-100 shadow-md border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Welcome section */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="text-blue-600">{user?.name || 'Guest'}</span>
          </h1>
        </div>
        
        {/* Actions section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(logout())}
            className="cursor-pointer px-4 py-2 hover:text-red-600 font-medium rounded-lg border border-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <LogOut/>
            LogOut
          </button>
        </div>
      </div>
    </div>
  )
}