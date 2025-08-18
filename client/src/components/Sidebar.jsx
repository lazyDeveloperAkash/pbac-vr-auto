
import React, { useState } from 'react';
import { 
  Home, 
  Clock, 
  Calendar, 
  Building, 
  FolderOpen, 
  CheckSquare, 
  Users,
  Shield,
  ChevronRight,
  UserCheck,
  Lock
} from 'lucide-react';
import { useSelector } from 'react-redux';
import usePermission from '../hooks/usePermission'
import { NavLink } from 'react-router-dom'

const Item = ({ to, label, icon: Icon, hasPermission }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-colors ${
          isActive 
            ? 'bg-white/20' 
            : 'bg-gray-100 group-hover:bg-white group-hover:shadow-sm'
        }`}>
          <Icon size={18} className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} />
        </div>
        <span className="flex-1">{label}</span>
        {!hasPermission && (
          <Shield size={14} className={`ml-2 ${isActive ? 'text-white/70' : 'text-yellow-500'}`} />
        )}
        <ChevronRight 
          size={16} 
          className={`ml-2 transition-transform ${isActive ? 'text-white/70 rotate-90' : 'text-gray-400 group-hover:translate-x-1'}`} 
        />
      </>
    )}
  </NavLink>
);

export default function Sidebar() {
  const user = useSelector((s) => s.auth.user);

  // Call hook once for each module
  const attendancePerm = usePermission('Attendance');
  const leavePerm = usePermission('Leave');
  const officePerm = usePermission('Office');
  const projectPerm = usePermission('Project');
  const taskPerm = usePermission('Task');
  const userPerm = usePermission('User');

  const modules = [
    { 
      key: 'Dashboard', 
      path: '/', 
      guard: true, 
      icon: Home,
      hasPermission: true 
    },
    { 
      key: 'Attendance', 
      path: '/attendance', 
      guard: attendancePerm.canRead || user?.role === 'ADMIN',
      icon: Clock,
      hasPermission: attendancePerm.canRead || user?.role === 'ADMIN'
    },
    { 
      key: 'Leave', 
      path: '/leaves', 
      guard: leavePerm.canRead || user?.role === 'ADMIN',
      icon: Calendar,
      hasPermission: leavePerm.canRead || user?.role === 'ADMIN'
    },
    { 
      key: 'Office', 
      path: '/offices', 
      guard: officePerm.canRead || user?.role === 'ADMIN',
      icon: Building,
      hasPermission: officePerm.canRead || user?.role === 'ADMIN'
    },
    { 
      key: 'Project', 
      path: '/projects', 
      guard: projectPerm.canRead || user?.role === 'ADMIN',
      icon: FolderOpen,
      hasPermission: projectPerm.canRead || user?.role === 'ADMIN'
    },
    { 
      key: 'Task', 
      path: '/tasks', 
      guard: taskPerm.canRead || user?.role === 'ADMIN',
      icon: CheckSquare,
      hasPermission: taskPerm.canRead || user?.role === 'ADMIN'
    },
    {
      key: 'User',
      path: '/users',
      guard: user?.role === 'ADMIN' || userPerm.canRead,
      icon: Users,
      hasPermission: user?.role === 'ADMIN' || userPerm.canRead
    },
  ];

  return (
    <aside className="w-72 shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-200 min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/50 to-blue-100/50 rounded-full blur-2xl transform -translate-x-12 translate-y-12"></div>
      
      <div className="relative z-10 p-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Office Suite
              </h1>
              <p className="text-xs text-gray-500 font-medium">Management System</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                user?.role === 'ADMIN' 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                <UserCheck size={10} className="mr-1" />
                {user?.role || 'USER'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Navigation
          </div>
          {modules.filter((m) => m.guard).map((m) => (
            <Item 
              key={m.key} 
              to={m.path} 
              label={m.key} 
              icon={m.icon}
              hasPermission={m.hasPermission}
            />
          ))}
        </nav>

        {/* Permission Status */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Lock size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Access Level</span>
          </div>
          <p className="text-xs text-blue-700">
            {user?.role === 'ADMIN' ? 'Full administrative access' : 'Permission-based access'}
          </p>
          <div className="mt-2 flex items-center space-x-1">
            {modules.slice(1).map((module) => (
              <div 
                key={module.key}
                className={`w-2 h-2 rounded-full ${
                  module.hasPermission ? 'bg-green-400' : 'bg-gray-300'
                }`}
                title={`${module.key}: ${module.hasPermission ? 'Accessible' : 'Restricted'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
    </aside>
  );
}