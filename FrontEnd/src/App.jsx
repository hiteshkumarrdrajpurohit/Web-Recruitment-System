import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './components/SignIn'
function App() {
 

  return (
   
      <Router>
        <Routes>
          {/* HR Auth */}
          <Route path="/" element={<SignIn />} />

          {/* Applicant Auth */}
         
          {/* HR Routes */}
          
          {/* Applicant Routes */}
         
        </Routes>
      </Router>
   
  );
}

export default App;