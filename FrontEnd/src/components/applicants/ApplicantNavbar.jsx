import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../App';

export default function Navbar() {
  const { user } = useAuth();
  // Fallback for initials and name
  const displayName = user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : ((user?.firstName?.[0] || '') + (user?.lastName?.[0] || '')).toUpperCase() || 'U';

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <span className="font-bold text-lg">HireHub</span>
      </div>
      <div className="flex gap-6 items-center">
        <Link
          to="/applicantlayout/user/dashboard"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/applicantlayout/user/jobs"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Browse Jobs
        </Link>
        <Link
          to="/applicantlayout/user/applications"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          My Applications
        </Link>
        <Link
          to="/applicantlayout/user/profile"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Profile
        </Link>
        <Link
          to="/applicantlayout/user/settings"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Settings
        </Link>
        <Link
          to="/"
          className="font-medium text-red-600 hover:text-red-800 ml-2"
        >
          Logout
        </Link>
        <div className="ml-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
            {initials}
          </div>
          <span className="font-medium text-gray-700">
            {displayName}
          </span>
        </div>
      </div>
    </nav>
  );
}
