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
import { mockUser } from '../data/mockData.js';

const navigation = [
  { name: 'Dashboard', path: 'dashboard', icon: Home },
  { name: 'Vacancies', path: 'vacancies', icon: Briefcase },
  { name: 'Applicants', path: 'applicants', icon: Users },
  { name: 'Interviews', path: 'interviews', icon: Calendar },
  { name: 'Hiring', path: 'hiring', icon: UserCheck },
  { name: 'Reports', path: 'reports', icon: BarChart3 },
  { name: 'Settings', path: 'settings', icon: Settings },
];


const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {/* Static Navbar */}
      <nav className="fixed w-full bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">RecruitPro</h1>
                <p className="text-xs text-gray-500">Recruitment System</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
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

            {/* Search and User Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 text-sm"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{mockUser.name}</p>
                  <p className="text-gray-500">{mockUser.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-col flex-1 pt-16">

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
