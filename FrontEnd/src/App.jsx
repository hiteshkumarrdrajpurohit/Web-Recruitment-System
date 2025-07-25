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

function App() {
  return (
    <Router>
      <Routes>
        {/* HR Auth */}
        <Route path="/" element={<SignIn />} />

        <Route path="/signup" element={<SignUp />} />
        {/* Applicant Auth */}

        {/* HR Routes */}

        {/* Applicant Routes */}
        <Route path="/user/profile" element={<ApplicantProfile />} />

        <Route path="/user/jobs" element={<JobListings />} />

        <Route path="/user/dashboard" element={<ApplicantDashboard />} />



      </Routes>
    </Router>
  );
}

export default App;
