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
  Search,
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
  const { setUser } = useAuth();

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

          {/* Desktop Navigation Links */}
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

          {/* Search and User Profile */}
          <div className="hidden sm:flex items-center space-x-4 min-w-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2 min-w-0">
             
              <div className="flex flex-row items-center gap-1 min-w-0">
               
                <button
                  onClick={() => { setUser(null); navigate('/'); }}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
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
              {/* Mobile search and profile */}
              <div className="mt-2 border-t pt-2">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm"
                  />
                </div>

                <div className="text-sm flex flex-col items-center">
                  <p className="font-medium text-gray-900">{mockUser.name}</p>
                  <p className="text-gray-500">{mockUser.role}</p>
                </div>
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
