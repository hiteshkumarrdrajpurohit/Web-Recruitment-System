import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const hrUser = { name: 'HR User', email: 'hr@company.com' };

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  
  // Step 1: Initialize with empty array instead of mock data
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true); // Step 4: Loading state
  const [deleteApplicantMsg, setDeleteApplicantMsg] = useState('');

  // Step 2: Fetch applicants from backend
  useEffect(() => {
  const fetchApplicants = async () => {
    try {
      // Mock data fallback
      const data = [
        { id: 1, firstName: 'Motli', lastName: 'dongare', email: 'motli@example.com', position: 'Frontend Developer', status: 'Interviewed' },
        { id: 2, firstName: 'hitesh', lastName: 'karad', email: 'hr@example.com', position: 'Backend Developer', status: 'Pending' },
      ];
      setApplicants(data);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplicants();
}, []);


  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg('Please fill all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    setPasswordMsg('Password changed successfully! (Demo only)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setDeleteMsg('HR account deleted! (Demo only)');
  };

  const handleDeleteApplicant = async (id) => {
    try {
      // Optional: call DELETE API
      // await fetch(`/api/applicants/${id}`, { method: 'DELETE' });

      setApplicants(applicants.filter(a => a.id !== id));
      setDeleteApplicantMsg('Applicant deleted! (Demo only)');
      setTimeout(() => setDeleteApplicantMsg(''), 2000);
    } catch (err) {
      console.error('Error deleting applicant:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">R</div>
          <span className="font-bold text-lg">RecruitPro</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/dashboard" className="font-medium text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/vacancies" className="font-medium text-gray-700 hover:text-blue-600">Vacancies</Link>
          <Link to="/applicants" className="font-medium text-gray-700 hover:text-blue-600">Applicants</Link>
          <Link to="/interviews" className="font-medium text-gray-700 hover:text-blue-600">Interviews</Link>
          <Link to="/hiring" className="font-medium text-gray-700 hover:text-blue-600">Hiring</Link>
          <Link to="/reports" className="font-medium text-gray-700 hover:text-blue-600">Reports</Link>
          <Link to="/settings" className="font-medium text-blue-600 px-2 py-1 rounded bg-blue-50">Settings</Link>
          <div className="ml-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">H</div>
            <span className="font-medium text-gray-700">{hrUser.name}</span>
          </div>
        </div>
      </nav>

      {/* Settings Content */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>

        {/* Applicant Management */}
        <div className="mb-10">
          <h3 className="font-semibold mb-2">Manage Applicants</h3>
          {deleteApplicantMsg && <div className="text-red-600 text-sm mb-2">{deleteApplicantMsg}</div>}

          {loading ? (
            <div className="text-gray-500 text-sm">Loading applicants...</div> // Step 4: Show loading
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map(applicant => (
                    <tr key={applicant.id} className="border-b">
                      <td className="px-4 py-2">{applicant.firstName} {applicant.lastName}</td>
                      <td className="px-4 py-2">{applicant.email}</td>
                      <td className="px-4 py-2">{applicant.position}</td>
                      <td className="px-4 py-2">{applicant.status}</td>
                      <td className="px-4 py-2 text-right">
                        <button onClick={() => handleDeleteApplicant(applicant.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Current Password</label>
              <input type="password" className="w-full px-4 py-2 border rounded" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input type="password" className="w-full px-4 py-2 border rounded" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Confirm New Password</label>
              <input type="password" className="w-full px-4 py-2 border rounded" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            {passwordMsg && <div className="text-blue-600 text-sm">{passwordMsg}</div>}
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Change Password</button>
          </form>
        </div>

        {/* Delete HR Account */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-red-600">Delete My HR Account</h3>
          <p className="mb-2 text-gray-600">Once you delete your account, there is no going back. Please be certain.</p>
          {deleteMsg && <div className="text-red-600 text-sm mb-2">{deleteMsg}</div>}
          <button onClick={handleDeleteAccount} className="px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700">Delete My Account</button>
        </div>
      </div>
    </div>
  );
}
