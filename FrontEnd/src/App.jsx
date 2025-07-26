import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ApplicantProfile from "./components/ApplicantProfile";

import JobListings from "./components/JobListings";
import ApplicantDashboard from "./components/ApplicantDashboard";
import Layout from "./components/Layout";
import MyApplications from "./components/MyApplications"
import { Vacancies } from "./components/Vacancies";
import Interviews from "./components/hr/Interviews";
// Placeholder components for missing pages
const Dashboard = () => <div>Hr DashBoard(HR)</div>;
//const Vacancies = () => <div>Vacancies Page (HR)</div>;
const Applicants = () => <div>Applicants Page (HR)</div>;
//const Interviews = () => <div>Interviews Page (HR)</div>;
const Hiring = () => <div>Hiring Page (HR)</div>;
const Reports = () => <div>Reports Page (HR)</div>;
const Settings = () => <div>Settings Page (HR)</div>;
const NotFound = () => <div>404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Bypass login: redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/layout/dashboard" replace />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Layout with nested routes for HR sidebar */}
        <Route path="/layout" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="hiring" element={<Hiring />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Applicant Routes */}
        <Route path="/user/profile" element={<ApplicantProfile />} />
        <Route path="/user/jobs" element={<JobListings />} />
        <Route path="/user/dashboard" element={<ApplicantDashboard />} />
        <Route path="/user/applications" element={<MyApplications />} />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
