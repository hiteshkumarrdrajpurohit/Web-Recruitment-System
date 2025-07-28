import React, { useEffect, useState } from "react";

 function HRHirings() {
  const [applicants, setApplicants] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [hiringDecisions, setHiringDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // MOCK DATA
    const mockApplicants = [
      { id: 1, name: "Alice Johnson", vacancyId: 101 },
      { id: 2, name: "Bob Smith", vacancyId: 102 },
      { id: 3, name: "Charlie Brown", vacancyId: 101 },
      { id: 4, name: "Diana Prince", vacancyId: 103 },
    ];
    const mockVacancies = [
      { id: 101, title: "Frontend Developer" },
      { id: 102, title: "Backend Developer" },
      { id: 103, title: "UI/UX Designer" },
    ];
    const mockInterviews = [
      { id: 1, applicantId: 1, date: "2025-07-20", time: "10:00 AM" },
      { id: 2, applicantId: 2, date: "2025-07-21", time: "2:00 PM" },
      { id: 3, applicantId: 3, date: "2025-07-22", time: "11:00 AM" },
    ];
    const mockHiringDecisions = [
      { id: 1, applicantId: 2, decision: "Rejected" },
      { id: 2, applicantId: 3, decision: "Hired" },
      { id: 3, applicantId: 4, decision: "Hired" },
    ];

    setTimeout(() => {
      setApplicants(mockApplicants);
      setVacancies(mockVacancies);
      setInterviews(mockInterviews);
      setHiringDecisions(mockHiringDecisions);
      setLoading(false);
      setError("");
    }, 500);
  }, []);

  const getApplicantName = (id) => {
    const applicant = applicants.find((a) => a.id === id);
    return applicant ? applicant.name : "Unknown";
  };

  const getVacancyTitle = (id) => {
    const vacancy = vacancies.find((v) => v.id === id);
    return vacancy ? vacancy.title : "Unknown";
  };

  const getInterviewDetails = (id) => {
    const interview = interviews.find((i) => i.id === id);
    return interview
      ? `${interview.date} at ${interview.time}`
      : "No interview";
  };

  const pendingDecisions = applicants.filter(
    (a) => !hiringDecisions.some((d) => d.applicantId === a.id)
  );

  const recentDecisions = hiringDecisions.slice(-5);
  const recentHires = hiringDecisions
    .filter((d) => d.decision === "Hired")
    .slice(-5);

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Hiring Overview</h2>
      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Decisions */}
          <section className="bg-white rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Pending Decisions</h3>
            {pendingDecisions.length === 0 ? (
              <p className="text-gray-500">No candidates pending decision.</p>
            ) : (
              <ul className="space-y-3">
                {pendingDecisions.map((a) => (
                  <li key={a.id} className="border p-3 rounded flex flex-col">
                    <span className="font-medium text-gray-900">{a.name}</span>
                    <span className="text-sm text-gray-600">
                      Applied for <span className="font-semibold">{getVacancyTitle(a.vacancyId)}</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      Interview: {getInterviewDetails(a.id)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent Decisions */}
          <section className="bg-white rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-yellow-700">Recent Decisions</h3>
            {recentDecisions.length === 0 ? (
              <p className="text-gray-500">No recent decisions.</p>
            ) : (
              <ul className="space-y-3">
                {recentDecisions.map((d) => (
                  <li key={d.id} className="border p-3 rounded flex items-center justify-between">
                    <span className="font-medium text-gray-900">{getApplicantName(d.applicantId)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${d.decision === "Hired" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {d.decision}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent Hires */}
          <section className="bg-white rounded-lg shadow p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-green-700">Recent Hires</h3>
            {recentHires.length === 0 ? (
              <p className="text-gray-500">No recent hires.</p>
            ) : (
              <ul className="space-y-3">
                {recentHires.map((d) => (
                  <li key={d.id} className="border p-3 rounded flex items-center justify-between">
                    <span className="font-medium text-gray-900">{getApplicantName(d.applicantId)}</span>
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Hired</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
export default HRHirings;