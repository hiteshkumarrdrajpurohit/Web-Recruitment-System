import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ApplicantProfile() {
  // Profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    dateOfBirth: "1990-01-01",
    skills: ["JavaScript", "React", "Node.js"],
    houseNo: "123",
    streetNo: "Main Street",
    landmark: "Near Park",
    area: "Downtown",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    nameOfOrganization: "Tech Corp",
    startDate: "2018-06-01",
    endDate: "2022-12-31",
    designation: "Senior Developer",
    summary: "Experienced full-stack developer with 5+ years of experience"
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    ...profile,
    skills: profile.skills.join(', '),
    dateOfBirth: profile.dateOfBirth,
    startDate: profile.startDate,
    endDate: profile.endDate
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({
      ...form,
      skills: form.skills.split(',').map(s => s.trim()),
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">R</div>
          <span className="font-bold text-lg">RecruitPro</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/applicant-dashboard" className="font-medium text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/jobs" className="font-medium text-gray-700 hover:text-blue-600">Browse Jobs</Link>
          <Link to="/my-applications" className="font-medium text-gray-700 hover:text-blue-600">My Applications</Link>
          <Link to="/applicant-profile" className="font-medium text-blue-600 px-2 py-1 rounded bg-blue-50">Profile</Link>
          <Link to="/settings" className="font-medium text-gray-700 hover:text-blue-600">Settings</Link>
          <div className="ml-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">{profile.firstName[0]}</div>
            <span className="font-medium text-gray-700">{profile.firstName} {profile.lastName}</span>
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700 mb-4">
            {profile.firstName[0]}
          </div>

          {editing ? (
            <form className="w-full" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Personal Information</h3>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Phone Number</label>
                    <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Skills (comma separated)</label>
                    <input name="skills" value={form.skills} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                </div>

                {/* Address and Work Experience */}
                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Address Information</h3>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">House No</label>
                    <input name="houseNo" value={form.houseNo} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Street No</label>
                    <input name="streetNo" value={form.streetNo} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Landmark</label>
                    <input name="landmark" value={form.landmark} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Area</label>
                    <input name="area" value={form.area} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">State</label>
                    <input name="state" value={form.state} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">ZIP Code</label>
                    <input name="zip" value={form.zip} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Country</label>
                    <input name="country" value={form.country} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>

                  <h3 className="font-bold text-lg mb-4 mt-6 border-b pb-2">Work Experience</h3>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Organization Name</label>
                    <input name="nameOfOrganization" value={form.nameOfOrganization} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Designation</label>
                    <input name="designation" value={form.designation} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Start Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">End Date</label>
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold block mb-1">Summary</label>
                    <textarea name="summary" value={form.summary} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows="3" required />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Save</button>
                <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-1">{profile.firstName} {profile.lastName}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Personal Information</h3>
                  <div className="mb-2"><span className="font-semibold">Email:</span> {profile.email}</div>
                  <div className="mb-2"><span className="font-semibold">Phone:</span> {profile.phoneNumber}</div>
                  <div className="mb-2"><span className="font-semibold">Date of Birth:</span> {profile.dateOfBirth}</div>
                  <div className="mb-4">
                    <span className="font-semibold block mb-2">Skills:</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Address Information</h3>
                  <div className="mb-2"><span className="font-semibold">Address:</span> {profile.houseNo}, {profile.streetNo}, {profile.landmark && `${profile.landmark}, `}{profile.area}</div>
                  <div className="mb-2"><span className="font-semibold">City:</span> {profile.city}</div>
                  <div className="mb-2"><span className="font-semibold">State:</span> {profile.state}</div>
                  <div className="mb-2"><span className="font-semibold">ZIP:</span> {profile.zip}</div>
                  <div className="mb-2"><span className="font-semibold">Country:</span> {profile.country}</div>
                </div>

                {/* Work Experience */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg mb-4 border-b pb-2">Work Experience</h3>
                  <div className="mb-2"><span className="font-semibold">Organization:</span> {profile.nameOfOrganization}</div>
                  <div className="mb-2"><span className="font-semibold">Designation:</span> {profile.designation}</div>
                  <div className="mb-2"><span className="font-semibold">Duration:</span> {profile.startDate} to {profile.endDate}</div>
                  <div className="mb-2"><span className="font-semibold">Summary:</span> {profile.summary}</div>
                </div>
              </div>

              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700" onClick={() => setEditing(true)}>Update Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}