import React, { useEffect, useState } from "react";

export function Hiring() {
  const [applicants, setApplicants] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [hiringDecisions, setHiringDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicantsRes, vacanciesRes, interviewsRes, decisionsRes] =
          await Promise.all([
            fetch("/api/applicants"),
            fetch("/api/vacancies"),
            fetch("/api/interviews"),
            fetch("/api/hiring-decisions"),
          ]);

        if (!applicantsRes.ok) throw new Error("Failed to fetch applicants");
        if (!vacanciesRes.ok) throw new Error("Failed to fetch vacancies");
        if (!interviewsRes.ok) throw new Error("Failed to fetch interviews");
        if (!decisionsRes.ok) throw new Error("Failed to fetch decisions");

        const applicantsData = await applicantsRes.json();
        const vacanciesData = await vacanciesRes.json();
        const interviewsData = await interviewsRes.json();
        const decisionsData = await decisionsRes.json();

        setApplicants(applicantsData);
        setVacancies(vacanciesData);
        setInterviews(interviewsData);
        setHiringDecisions(decisionsData);
      } catch (err) {
        console.error("Fetch Error:", err.message);
        setError("Failed to load hiring data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Hiring Overview</h2>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {/* Pending Decisions Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Pending Decisions</h3>
            {pendingDecisions.length === 0 ? (
              <p>No candidates pending decision.</p>
            ) : (
              <ul className="space-y-2">
                {pendingDecisions.map((a) => (
                  <li key={a.id} className="border p-3 rounded shadow">
                    <strong>{a.name}</strong> applied for{" "}
                    {getVacancyTitle(a.vacancyId)} | Interview:{" "}
                    {getInterviewDetails(a.id)}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent Decisions Section */}
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Recent Decisions</h3>
            {recentDecisions.length === 0 ? (
              <p>No recent decisions.</p>
            ) : (
              <ul className="space-y-2">
                {recentDecisions.map((d) => (
                  <li key={d.id} className="border p-3 rounded shadow">
                    <strong>{getApplicantName(d.applicantId)}</strong> –{" "}
                    {d.decision}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Recent Hires Section */}
          <section>
            <h3 className="text-xl font-semibold mb-2">Recent Hires</h3>
            {recentHires.length === 0 ? (
              <p>No recent hires.</p>
            ) : (
              <ul className="space-y-2">
                {recentHires.map((d) => (
                  <li key={d.id} className="border p-3 rounded shadow">
                    <strong>{getApplicantName(d.applicantId)}</strong> – Hired
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
