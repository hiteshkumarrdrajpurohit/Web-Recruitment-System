import React, { useState } from 'react';
import { 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar,
  FileText,
  Mail,
  Phone,
  Award,
  AlertCircle,
  CheckCircle,
  Star,
  Send
} from 'lucide-react';
import { mockApplicants, mockVacancies, mockInterviews, mockHiringDecisions } from '../../data/mockData.js';

 function HRHirings() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [hiringDecisions, setHiringDecisions] = useState(mockHiringDecisions);

  // Get applicants ready for hiring decision (interviewed status)
  const candidatesForDecision = mockApplicants.filter(a => 
    a.status === 'Interviewed' || a.status === 'Shortlisted'
  );

  // Get recently hired candidates
  const recentHires = mockApplicants.filter(a => a.status === 'Hired');

  // Get rejected candidates
  const rejectedCandidates = mockApplicants.filter(a => a.status === 'Rejected');

  const makeHiringDecision = (decision) => {
    const newDecision = {
      ...decision,
      id: Date.now().toString()
    };
    setHiringDecisions([...hiringDecisions, newDecision]);
    setShowDecisionModal(false);
    setSelectedApplicant(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hiring Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Make hiring decisions and manage the final stages of recruitment.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <SummaryCard
          title="Pending Decisions"
          value={candidatesForDecision.length}
          icon={Clock}
          color="bg-yellow-500"
          description="Candidates awaiting decision"
        />
        <SummaryCard
          title="Recent Hires"
          value={recentHires.length}
          icon={UserCheck}
          color="bg-green-500"
          description="Successfully hired"
        />
        <SummaryCard
          title="Rejected"
          value={rejectedCandidates.length}
          icon={UserX}
          color="bg-red-500"
          description="Not selected"
        />
       
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Candidates for Decision */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Candidates for Decision</h3>
            <p className="text-sm text-gray-600">Review and make hiring decisions</p>
          </div>
          <div className="p-6">
            {candidatesForDecision.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No candidates pending decision</p>
            ) : (
              <div className="space-y-4">
                {candidatesForDecision.map((applicant) => (
                  <CandidateCard 
                    key={applicant.id} 
                    applicant={applicant}
                    onMakeDecision={() => {
                      setSelectedApplicant(applicant);
                      setShowDecisionModal(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Hiring Decisions */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Decisions</h3>
            <p className="text-sm text-gray-600">Latest hiring outcomes</p>
          </div>
          <div className="p-6">
            {hiringDecisions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent decisions</p>
            ) : (
              <div className="space-y-4">
                {hiringDecisions.map((decision) => {
                  const applicant = mockApplicants.find(a => a.id === decision.applicantId);
                  const vacancy = mockVacancies.find(v => v.id === decision.vacancyId);
                  return (
                    <DecisionCard 
                      key={decision.id} 
                      decision={decision}
                      applicant={applicant}
                      vacancy={vacancy}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Hires Overview */}
      <div className="mt-8 bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Hires</h3>
          <p className="text-sm text-gray-600">Successfully onboarded candidates</p>
        </div>
        <div className="p-6">
          {recentHires.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent hires</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentHires.map((hire) => {
                const vacancy = mockVacancies.find(v => v.id === hire.vacancyId);
                const decision = hiringDecisions.find(d => d.applicantId === hire.id);
                return (
                  <HireCard 
                    key={hire.id} 
                    applicant={hire}
                    vacancy={vacancy}
                    decision={decision}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hiring Decision Modal */}
      {showDecisionModal && selectedApplicant && (
        <HiringDecisionModal
          applicant={selectedApplicant}
          onClose={() => {
            setShowDecisionModal(false);
            setSelectedApplicant(null);
          }}
          onDecision={makeHiringDecision}
        />
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`${color} p-3 rounded-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-2xl font-bold text-gray-900">{value}</dd>
              <dd className="text-xs text-gray-500">{description}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ applicant, onMakeDecision }) {
  const vacancy = mockVacancies.find(v => v.id === applicant.vacancyId);
  // No average rating or stars
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {applicant.firstName[0]}{applicant.lastName[0]}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {applicant.firstName} {applicant.lastName}
            </h4>
            <p className="text-sm text-gray-600">{vacancy?.title}</p>
            <p className="text-xs text-gray-500">{applicant.experience} years experience</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          {applicant.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          {applicant.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">{applicant.notes}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onMakeDecision}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <UserCheck className="h-4 w-4 mr-1" />
          Make Decision
        </button>
        <button className="px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
          <FileText className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DecisionCard({ decision, applicant, vacancy }) {
  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'Hire': return 'text-green-600 bg-green-50 border-green-200';
      case 'Reject': return 'text-red-600 bg-red-50 border-red-200';
      case 'Hold': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDecisionIcon = (decision) => {
    switch (decision) {
      case 'Hire': return <CheckCircle className="h-4 w-4" />;
      case 'Reject': return <UserX className="h-4 w-4" />;
      case 'Hold': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">
            {applicant?.firstName} {applicant?.lastName}
          </h4>
          <p className="text-sm text-gray-600">{vacancy?.title}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDecisionColor(decision.decision)}`}>
          {getDecisionIcon(decision.decision)}
          <span className="ml-1">{decision.decision}</span>
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-3">{decision.reason}</p>

      {decision.decision === 'Hire' && decision.salaryOffered && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          Salary Offered: ₹{decision.salaryOffered.toLocaleString('en-IN')}
        </div>
      )}

      {decision.startDate && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          Start Date: {new Date(decision.startDate).toLocaleDateString()}
        </div>
      )}

      <div className="text-xs text-gray-500">
        Decision made on {new Date(decision.decidedDate).toLocaleDateString()}
      </div>
    </div>
  );
}

function HireCard({ applicant, vacancy, decision }) {
  return (
    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
      <div className="flex items-center space-x-3 mb-3">
        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            {applicant.firstName[0]}{applicant.lastName[0]}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">
            {applicant.firstName} {applicant.lastName}
          </h4>
          <p className="text-sm text-gray-600">{vacancy?.title}</p>
        </div>
      </div>

      {decision?.salaryOffered && (
        <div className="flex items-center text-sm text-gray-700 mb-2">
          Salary Offered: ₹{decision.salaryOffered.toLocaleString('en-IN')}
        </div>
      )}

      {decision?.startDate && (
        <div className="flex items-center text-sm text-gray-700">
          <Calendar className="h-4 w-4 mr-2" />
          Starts: {new Date(decision.startDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}

function HiringDecisionModal({ applicant, onClose, onDecision }) {
  const [formData, setFormData] = useState({
    decision: 'Hire',
    reason: '',
    salaryOffered: '',
    startDate: '',
    notes: ''
  });

  const vacancy = mockVacancies.find(v => v.id === applicant.vacancyId);
  const interviews = mockInterviews.filter(i => i.applicantId === applicant.id && i.status === 'Completed');

  const handleSubmit = (e) => {
    e.preventDefault();
    const decision = {
      applicantId: applicant.id,
      vacancyId: applicant.vacancyId,
      decision: formData.decision,
      reason: formData.reason,
      salaryOffered: formData.salaryOffered ? parseInt(formData.salaryOffered) : undefined,
      startDate: formData.startDate || undefined,
      decidedBy: 'HR001',
      decidedDate: new Date().toISOString(),
      notes: formData.notes
    };
    onDecision(decision);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Hiring Decision - {applicant.firstName} {applicant.lastName}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            {/* Candidate Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Candidate Summary</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Position:</span>
                  <span className="ml-2 text-sm text-gray-900">{vacancy?.title}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Experience:</span>
                  <span className="ml-2 text-sm text-gray-900">{applicant.experience} years</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Education:</span>
                  <span className="ml-2 text-sm text-gray-900">{applicant.education}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Score:</span>
                  <span className="ml-2 text-sm text-gray-900">{applicant.score}/100</span>
                </div>
              </div>
            </div>

            {/* Interview Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Interview Summary</h4>
              <div className="space-y-3">
                {interviews.map((interview, index) => (
                  <div key={interview.id} className="text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Round {interview.round} ({interview.type}):</span>
                      <span className="text-gray-900">{interview.result?.rating}/5</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">{interview.result?.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Hire', 'Reject', 'Hold']).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, decision: option })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      formData.decision === option
                        ? option === 'Hire' ? 'border-green-500 bg-green-50 text-green-700'
                          : option === 'Reject' ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option === 'Hire' && <UserCheck className="h-5 w-5 mx-auto mb-1" />}
                    {option === 'Reject' && <UserX className="h-5 w-5 mx-auto mb-1" />}
                    {option === 'Hold' && <Clock className="h-5 w-5 mx-auto mb-1" />}
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason for Decision</label>
              <textarea
                required
                rows={3}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed reasoning for your decision..."
              />
            </div>

            {formData.decision === 'Hire' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Salary Offer (₹)</label>
                  <input
                    type="number"
                    value={formData.salaryOffered}
                    onChange={(e) => setFormData({ ...formData, salaryOffered: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Proposed Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes or next steps..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2 inline" />
                Submit Decision
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HRHirings;