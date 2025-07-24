import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

{/* dummy users */}
const DUMMY_USERS = [
  { id: 1, email: 'a@gmail.com', password: '123456', role: 'applicant' },
  { id: 2, email: 'h@gmail.com', password: '123456', role: 'hr' },
];

const DEMO_CREDENTIALS = [
  { label: 'Job Seeker', email: 'a@gmail.com', password: '123456', role: 'applicant' },
  { label: 'HR Manager', email: 'hr@company.com', password: 'hr123' },
];

const BG_IMG= "../";
function SignIn({ onSwitchToForgetPassword,onSwitchToSignUp, onSignIn }) {

  {/* state variables */}
  const [role, setRole] = useState('applicant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
      setError('');
      if (onSignIn) onSignIn(user.role);
    } else {
      setError('Invalid credentials');
    }
  };
  return (
     <div className="relative min-h-screen flex flex-col justify-center items-center"> 

     {/* background image */}

     <div className="absolute inset-0 z-0">
      <img src={BG_IMG} alt="background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50" /> 
     </div>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-8 py-4 bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="text-white text-2xl font-bold tracking-wide">HireHub</span>
         
        </div>
      </nav>
   {/* Sign In Card */}

<div className="relative z-10 w-full max-w-md">

<div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white"> <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg> </span>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome To HireHub</h2>
          <p className="text-gray-200 mb-4">Sign in Here</p>
</div>


<form className="bg-white rounded-xl shadow p-8 flex flex-col gap-4" onSubmit={handleSignIn}>
          {/* Role Toggle */}
          <div className="flex mb-2 rounded-lg overflow-hidden border border-gray-200">
            <button type="button" className={`flex-1 py-2 text-sm font-semibold ${role === 'applicant' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-500'}`} onClick={() => setRole('applicant')}>Applicant</button>
            <button type="button" className={`flex-1 py-2 text-sm font-semibold ${role === 'hr' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-500'}`} onClick={() => setRole('hr')}>HR Manager</button>
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-2 border rounded bg-gray-50 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 text-white rounded font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow"
          >
            Sign In
          </button>
          <div className="text-center mt-2">
            {role === 'applicant' && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={onSwitchToSignUp}
              >
                Don't have an account?  <span className="font-semibold">  Sign up</span> 
              </button>
            )}
          </div>
          <div className="text-center mt-2">
            {role === 'applicant' && (
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={onSwitchToForgetPassword}
              >
                Forget Your password?  <span className="font-semibold"> Cick here</span> 
              </button>
            )}
          </div>
         
    </form>
     </div>
   </div>
  );

}


export default SignIn;