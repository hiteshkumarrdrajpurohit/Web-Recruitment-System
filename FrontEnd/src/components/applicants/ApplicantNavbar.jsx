import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../App';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // This will also clear localStorage
    navigate('/');
  };
  // Name and initials with better fallbacks (first+last -> name -> email prefix -> 'User')
  const first = (user?.firstName || '').trim();
  const last = (user?.lastName || '').trim();
  const emailPrefix = (user?.email || '').split('@')[0] || '';
  const displayName = (first || last)
    ? `${first}${last ? ' ' + last : ''}`
    : (user?.name || emailPrefix || 'User');
  const initials = (first || last)
    ? `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    : (user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
        : (emailPrefix.slice(0, 2).toUpperCase() || 'U'));

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
          to="/applicantlayout/user/interviews"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          My Interviews
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
        <button
          onClick={handleLogout}
          className="font-medium text-red-600 hover:text-red-800 ml-2"
        >
          Logout
        </button>
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
