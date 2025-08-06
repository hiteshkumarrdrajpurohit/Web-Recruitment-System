import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiCalendar } from 'react-icons/fi';
import { handleHrManagerSignUp } from '../services/auth';

function HrSignUp() {
    const navigate = useNavigate();
    
    // State variables
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!firstname || !lastname || !dob || !phone || !email || !password || !confirmPassword || !department) {
            setError('Please fill all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        
        setError('');
        setLoading(true);
        
        try {
            const userData = {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password,
                phoneNumber: phone,
                dateOfBirth: dob,
                role: 'HRMANAGER'
            };
            
            const response = await handleHrManagerSignUp(userData);
            
            if (response && response.success && response.data) {
                // Store user data in session storage
                const token = response.data.token;
                const userId = response.data.id;
                
                if (!token || !userId) {
                    setError('Invalid response from server. Missing required data.');
                    return;
                }
                
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('userRole', 'HRMANAGER');
                
                // Navigate to HR dashboard
                navigate('/layout/dashboard');
            } else {
                setError(response?.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('An error occurred during signup. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
            
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-4">
                    <span className="text-white text-2xl font-bold tracking-wide">HireHub</span>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    Back to Sign In
                </button>
            </nav>

            {/* Sign Up Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                        <span className="text-2xl font-bold text-white">
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-white">HR Manager Registration</h2>
                    <p className="text-gray-200 mb-4">Create your HR Manager account</p>
                </div>

                <form className="bg-white rounded-xl shadow p-8 flex flex-col gap-4" onSubmit={handleSignUpSubmit}>
                    {/* Role Display */}
                    <div className="flex mb-2 rounded-lg overflow-hidden border border-gray-200">
                        <button
                            type="button"
                            className="flex-1 py-2 text-sm font-semibold bg-blue-50 text-blue-700 cursor-default"
                            disabled
                        >
                            HR Manager
                        </button>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Enter your first name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Enter your last name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full px-4 py-2 border rounded bg-gray-50 focus:outline-none"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Recruitment">Recruitment</option>
                            <option value="Talent Management">Talent Management</option>
                            <option value="Employee Relations">Employee Relations</option>
                            <option value="Compensation & Benefits">Compensation & Benefits</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-2 border rounded bg-gray-50 focus:outline-none"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-2 text-white rounded font-semibold bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create HR Manager Account'}
                    </button>

                    <div className="text-center mt-2">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => navigate('/')}
                        >
                            Already have an account? <span className="font-semibold">Sign in</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HrSignUp; 