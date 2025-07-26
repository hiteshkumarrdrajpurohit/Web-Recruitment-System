import React, { useState } from 'react';
import { Calendar, Clock, User, Briefcase, Video, Building, Search } from 'lucide-react';
import { mockInterviews, mockApplicants, mockVacancies } from '../../data/mockData.js';

export function Interviews() {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleScheduleInterview = (interviewData) => {
    const newInterview = {
      id: (interviews.length + 1).toString(),
      ...interviewData,
      status: 'Scheduled'
    };
    setInterviews([...interviews, newInterview]);
    setShowScheduleModal(false);
  };

  const filteredInterviews = interviews.filter(interview => {
    const applicant = mockApplicants.find(a => a.id === interview.applicantId);
    const vacancy = mockVacancies.find(v => v.id === interview.vacancyId);
    
    const matchesSearch = !searchTerm || 
      (applicant?.firstName + ' ' + applicant?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy?.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || interview.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
          <p className="mt-2 text-sm text-gray-700">
            Schedule and manage interviews with candidates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Interview List */}
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInterviews.map((interview) => {
            const applicant = mockApplicants.find(a => a.id === interview.applicantId);
            const vacancy = mockVacancies.find(v => v.id === interview.vacancyId);
            
            return (
              <div key={interview.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      interview.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {interview.status}
                  </span>
                  <span className="text-xs text-gray-500">Round {interview.round}</span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {applicant?.firstName} {applicant?.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{vacancy?.title}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(interview.scheduledDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(interview.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {interview.interviewer}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {interview.type === 'Video' ? (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Online Meeting
                      </>
                    ) : (
                      <>
                        <Building className="h-4 w-4 mr-2" />
                        {interview.location}
                      </>
                    )}
                  </div>
                </div>

                {interview.status === 'Scheduled' && (
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={() => {
                        setSelectedInterview(interview);
                        setShowResultModal(true);
                      }}
                      className="flex-1 text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md"
                    >
                      Complete
                    </button>
                    <button 
                      onClick={() => {
                        const confirmed = window.confirm('Are you sure you want to cancel this interview?');
                        if (confirmed) {
                          const updatedInterviews = interviews.map(i => 
                            i.id === interview.id ? { ...i, status: 'Cancelled' } : i
                          );
                          setInterviews(updatedInterviews);
                        }
                      }}
                      className="flex-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <ScheduleInterviewModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleInterview}
        />
      )}

      {/* Interview Result Modal */}
      {showResultModal && selectedInterview && (
        <InterviewResultModal
          interview={selectedInterview}
          onClose={() => {
            setShowResultModal(false);
            setSelectedInterview(null);
          }}
          onSubmit={(result) => {
            const updatedInterviews = interviews.map(interview =>
              interview.id === selectedInterview.id
                ? { ...interview, status: 'Completed', result }
                : interview
            );
            setInterviews(updatedInterviews);
            setShowResultModal(false);
            setSelectedInterview(null);
          }}
        />
      )}
    </div>
  );
}

function ScheduleInterviewModal({ onClose, onSchedule }) {
  const [formData, setFormData] = useState({
    applicantId: '',
    vacancyId: '',
    type: 'Video',
    scheduledDate: '',
    scheduledTime: '',
    duration: 60,
    interviewer: '',
    interviewerEmail: '',
    location: '',
    meetingLink: '',
    round: 1,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const scheduledDateTime = new Date(formData.scheduledDate + 'T' + formData.scheduledTime);
    onSchedule({
      ...formData,
      scheduledDate: scheduledDateTime.toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Schedule Interview</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Applicant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Applicant</label>
              <select
                required
                value={formData.applicantId}
                onChange={(e) => setFormData({ ...formData, applicantId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Applicant</option>
                {mockApplicants.map((applicant) => (
                  <option key={applicant.id} value={applicant.id}>
                    {applicant.firstName} {applicant.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select
                required
                value={formData.vacancyId}
                onChange={(e) => setFormData({ ...formData, vacancyId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Position</option>
                {mockVacancies.map((vacancy) => (
                  <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Interview Type</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Video">Video Interview</option>
                <option value="In-person">In-person Interview</option>
                <option value="Phone">Phone Interview</option>
              </select>
            </div>

            {/* Interview Round */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Round</label>
              <input
                type="number"
                min="1"
                required
                value={formData.round}
                onChange={(e) => setFormData({ ...formData, round: parseInt(e.target.value) })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                required
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                min="15"
                step="15"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Interviewer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Interviewer Name</label>
              <input
                type="text"
                required
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Interviewer Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Interviewer Email</label>
              <input
                type="email"
                required
                value={formData.interviewerEmail}
                onChange={(e) => setFormData({ ...formData, interviewerEmail: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location/Meeting Link based on type */}
            {formData.type === 'In-person' ? (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Conference Room A, 3rd Floor"
                />
              </div>
            ) : formData.type === 'Video' && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Meeting Link</label>
                <input
                  type="url"
                  required
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., https://zoom.us/j/123456789"
                />
              </div>
            )}

            {/* Notes */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional notes or instructions..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InterviewResultModal({ interview, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    rating: 3,
    feedback: '',
    recommendation: 'Consider',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Interview Result</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`p-1 ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation</label>
            <select
              value={formData.recommendation}
              onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Hire">Hire</option>
              <option value="Consider">Consider</option>
              <option value="Reject">Reject</option>
            </select>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
            <textarea
              required
              rows="3"
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide detailed feedback about the interview..."
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              rows="2"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes or observations..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Interviews;