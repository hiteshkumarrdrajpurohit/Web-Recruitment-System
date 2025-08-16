import React, { useState } from 'react';

import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  UserCheck,
  BarChart3
} from 'lucide-react';
import { mockUser } from '../../data/mockData.js';
import { useAuth } from '../../App';

const navigation = [
  { name: 'Dashboard', path: 'dashboard', icon: Home },
  { name: 'Vacancies', path: 'vacancies', icon: Briefcase },
  { name: 'Applicants', path: 'applicants', icon: Users },
  { name: 'Interviews', path: 'interviews', icon: Calendar },
  { name: 'Hiring', path: 'hiring', icon: UserCheck },
  { name: 'Settings', path: 'settings', icon: Settings },
];


const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useAuth();

  const first = (user?.firstName || '').trim();
  const last = (user?.lastName || '').trim();
  const emailPrefix = (user?.email || '').split('@')[0] || '';
  const displayName = (first || last)
    ? `${first}${last ? ' ' + last : ''}`
    : (user?.name || emailPrefix || 'User');
  const roleLabel = user?.role || 'HR';
  const initials = (first || last)
    ? `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    : (user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : (emailPrefix.slice(0, 2).toUpperCase() || 'U'));

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
      {/* Static Navbar */}
      <nav className="fixed w-full bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3 flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">HireHub</h1>
              <p className="text-xs text-gray-500">Recruitment System</p>
            </div>
          </div>

          {/* Desktop Navigation Links + Compact Right Section (Logout + User) */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.endsWith(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium`}
                >
                  <Icon className={`${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                  } mr-2 h-5 w-5`} />
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={() => { setUser(null); navigate('/'); }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
            >
              Logout
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                {initials}
              </div>
              <span className="font-medium text-gray-700 truncate max-w-[140px]">{displayName}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          
        </div>
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.endsWith(item.path);
                return (
                  <button
                    key={item.name}
                    onClick={() => { setMobileMenuOpen(false); navigate(item.path); }}
                    className={`w-full text-left flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`${isActive ? 'text-blue-500' : 'text-gray-400'} mr-2 h-5 w-5`} />
                    {item.name}
                  </button>
                );
              })}
              {/* Mobile compact profile */}
              <div className="mt-2 border-t pt-2 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">{initials}</div>
                <span className="font-medium text-gray-900">{displayName}</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-16">
        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
