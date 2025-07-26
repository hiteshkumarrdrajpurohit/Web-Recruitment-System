import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Download, Eye,
  UserCheck, UserX
} from 'lucide-react';

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummyApplicants = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '1234567890',
      position: 'Frontend Developer',
      experience: 3,
      status: 'Applied',
      appliedDate: '2025-07-20',
      vacancyId: 101
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob.smith@example.com',
      phone: '9876543210',
      position: 'Backend Developer',
      experience: 5,
      status: 'Shortlisted',
      appliedDate: '2025-07-18',
      vacancyId: 102
    }
  ];

  const dummyVacancies = [
    { id: 101, title: 'Frontend Developer' },
    { id: 102, title: 'Backend Developer' }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setApplicants(dummyApplicants);
      setVacancies(dummyVacancies);
      setLoading(false);
    }, 500); // Simulated delay
  }, []);

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch =
      applicant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'All' || applicant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const updateApplicantStatus = (id, newStatus) => {
    setApplicants(prev =>
      prev.map(applicant =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
    if (selectedApplicant?.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading applicants...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage job applications and candidate profiles.
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplicants.map(applicant => (
                <tr key={applicant.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedApplicant(applicant)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {applicant.firstName[0]}{applicant.lastName[0]}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {applicant.firstName} {applicant.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{applicant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{applicant.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{applicant.experience} years</td>
                  <td className="px-6 py-4"><StatusBadge status={applicant.status} /></td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(applicant.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedApplicant(applicant); }} className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); updateApplicantStatus(applicant.id, 'Shortlisted'); }} className="text-green-600 hover:text-green-900">
                      <UserCheck className="h-4 w-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); updateApplicantStatus(applicant.id, 'Rejected'); }} className="text-red-600 hover:text-red-900">
                      <UserX className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplicant && (
        <ApplicantDetailModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onUpdateStatus={updateApplicantStatus}
          vacancies={vacancies}
        />
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-gray-100 text-gray-800';
      case 'Reviewed': return 'bg-blue-100 text-blue-800';
      case 'Shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Interviewed': return 'bg-indigo-100 text-indigo-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>{status}</span>;
}

function ApplicantDetailModal({ applicant, onClose, onUpdateStatus, vacancies }) {
  const vacancy = vacancies.find(v => v.id === applicant.vacancyId);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {applicant.firstName} {applicant.lastName}
        </h2>
        <p className="text-sm text-gray-700 mb-1">Email: {applicant.email}</p>
        <p className="text-sm text-gray-700 mb-1">Phone: {applicant.phone}</p>
        <p className="text-sm text-gray-700 mb-1">Experience: {applicant.experience} years</p>
        <p className="text-sm text-gray-700 mb-1">Position: {applicant.position}</p>
        <p className="text-sm text-gray-700">Vacancy: {vacancy?.title}</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onUpdateStatus(applicant.id, 'Shortlisted')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Shortlist
          </button>
          <button
            onClick={() => onUpdateStatus(applicant.id, 'Rejected')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}


export default Applicants;