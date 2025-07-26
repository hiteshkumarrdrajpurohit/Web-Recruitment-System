import React from 'react';

import ApplicantNavbar from './ApplicantNavbar';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';


const ApplicantLayout = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            {/* Static Navbar */}
            <ApplicantNavbar />
            {/* Main Content */}
            <div className="flex flex-col flex-1 pt-0">
                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-0 px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApplicantLayout;