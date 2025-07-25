import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import ApplicantProfile from "./components/ApplicantProfile";
import JobListings from "./components/JobListings";

function App() {
  return (
    <Router>
      <Routes>
        {/* HR Auth */}
        <Route path="/" element={<SignIn />} />

        {/* Applicant Auth */}

        {/* HR Routes */}

        {/* Applicant Routes */}
        <Route path="/user/profile" element={<ApplicantProfile />} />
        <Route path="/user/jobs" element={<JobListings />} />
      </Routes>
    </Router>
  );
}

export default App;
