import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";


import Applicants from "./components/hr/Applicants";
import HRDashboard from "./components/hr/HRDashboard";
import HRHirings from "./components/hr/HRHirings";
import HRReports from "./components/hr/HRReports";
import Interviews from "./components/hr/Interviews";
import Layout from "./components/hr/Layout";
import  Settings  from "./components/hr/Settings";
import Vacancies from "./components/hr/Vacancies";


import MyApplications from "./components/applicants/MyApplications"
import ApplicantProfile from "./components/applicants/ApplicantProfile";
import JobListings from "./components/applicants/JobListings";
import ApplicantDashboard from "./components/applicants/ApplicantDashboard";
import ApplicantSettings from "./components/applicants/ApplicantSettings";
import ApplicantLayout from "./components/applicants/ApplicantLayout";



// Placeholder components for missing pages
//const Dashboard = () => <div>Hr DashBoard(HR)</div>;
//const Vacancies = () => <div>Vacancies Page (HR)</div>;
//const Applicants = () => <div>Applicants Page (HR)</div>;
//const Interviews = () => <div>Interviews Page (HR)</div>;
//const Hiring = () => <div>Hiring Page (HR)</div>;
//const Reports = () => <div>Reports Page (HR)</div>;
//const Settings = () => <div>Settings Page (HR)</div>;
const NotFound = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Bypass login: redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/applicantlayout/user/dashboard" replace />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Layout with nested routes for HR sidebar */}
        <Route path="/layout" element={<Layout />}>
          
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="hiring" element={<HRHirings />} />
          <Route path="reports" element={<HRReports />} />
          <Route path="settings" element={<Settings />} />
          
        </Route>


        {/* Applicant Routes */}

        <Route path="/applicantlayout" element={<ApplicantLayout />}>
          <Route path="user/profile" element={<ApplicantProfile />} />
          { <Route path="user/jobs" element={<JobListings />} /> }
          <Route path="user/dashboard" element={<ApplicantDashboard />} />
          <Route path="user/applications" element={<MyApplications />} />
          <Route path="user/settings" element={<ApplicantSettings />} />
        </Route>
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
