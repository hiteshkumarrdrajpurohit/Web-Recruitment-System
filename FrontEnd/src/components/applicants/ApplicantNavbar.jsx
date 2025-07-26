import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ applicant, profile }) {
  //whichever prop is passed , so it will assign in the user object
  const user = applicant || profile || { firstName: "User", lastName: "" };

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
            {user.firstName?.[0] || "U"}
          </div>
          <span className="font-medium text-gray-700">
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </nav>
  );
}
