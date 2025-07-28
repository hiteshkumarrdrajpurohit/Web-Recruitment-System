import React, { useState, createContext, useContext } from "react";
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

// PrivateRoute component inside App.jsx
function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(null);

  return (

    <AuthContext.Provider value={{ user, setUser }}>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected HR routes */}
        <Route path="/layout" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="dashboard" element={<PrivateRoute><HRDashboard /></PrivateRoute>} />
          <Route path="vacancies" element={<PrivateRoute><Vacancies /></PrivateRoute>} />
          <Route path="applicants" element={<PrivateRoute><Applicants /></PrivateRoute>} />
          <Route path="interviews" element={<PrivateRoute><Interviews /></PrivateRoute>} />
          <Route path="hiring" element={<PrivateRoute><HRHirings /></PrivateRoute>} />
          <Route path="reports" element={<PrivateRoute><HRReports /></PrivateRoute>} />
          <Route path="settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Route>

        {/* Protected Applicant routes */}
        <Route path="/applicantlayout" element={<PrivateRoute><ApplicantLayout /></PrivateRoute>}>
          <Route path="user/profile" element={<PrivateRoute><ApplicantProfile /></PrivateRoute>} />
          { <Route path="user/jobs" element={<PrivateRoute><JobListings /></PrivateRoute>} /> }
          <Route path="user/dashboard" element={<PrivateRoute><ApplicantDashboard /></PrivateRoute>} />
          <Route path="user/applications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
          <Route path="user/settings" element={<PrivateRoute><ApplicantSettings /></PrivateRoute>} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

   </AuthContext.Provider>
  );
}

export default App;
