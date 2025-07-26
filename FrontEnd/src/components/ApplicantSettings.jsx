import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ApplicantSettings() {
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  // 1️⃣ Fetch applicant data on mount
  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await axios.get("/api/applicant"); // ✅ Adjust API as needed
        setApplicant(res.data);
      } catch (err) {
        console.error("Failed to load applicant:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicant();
  }, []);

  // 2️⃣ Password change simulation
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    setPasswordMsg("Password changed successfully! (Demo only)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // 3️⃣ Delete simulation
  const handleDeleteAccount = () => {
    setDeleteMsg("Account deleted! (Demo only)");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading settings...
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load applicant settings.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            R
          </div>
          <span className="font-bold text-lg">RecruitPro</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link
            to="/applicant-dashboard"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/jobs"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Browse Jobs
          </Link>
          <Link
            to="/my-applications"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            My Applications
          </Link>
          <Link
            to="/applicant-profile"
            className="font-medium text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>
          <Link
            to="/user/settings"
            className="font-medium text-blue-600 px-2 py-1 rounded bg-blue-50"
          >
            Settings
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
              {applicant.firstName[0]}
            </div>
            <span className="font-medium text-gray-700">
              {applicant.firstName} {applicant.lastName}
            </span>
          </div>
        </div>
      </nav>

      {/* Settings Content */}
      <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        {/* Change Password */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {passwordMsg && (
              <div className="text-blue-600 text-sm">{passwordMsg}</div>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Delete Account */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-red-600">Delete Account</h3>
          <p className="mb-2 text-gray-600">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          {deleteMsg && (
            <div className="text-red-600 text-sm mb-2">{deleteMsg}</div>
          )}
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
