
import React, { useState } from "react";
import { vacancyService } from "../../services/vacancy";
import { toast } from "react-hot-toast";

function CreateVacancyModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    employementType: "FULL_TIME",
    description: "",
    jobDescription: "",
    reponsibilites: "",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
    requiredEducation: "",
    requiredExperience: "",
    numberOfVacencies: "1",
    shiftDetails: "",
    status: "ACTIVE"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vacancy = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        employementType: formData.employementType,
        description: formData.description,
        jobDescription: formData.jobDescription,
        reponsibilites: formData.reponsibilites,
        minSalary: parseInt(formData.minSalary),
        maxSalary: parseInt(formData.maxSalary),
        applicationDeadline: formData.applicationDeadline,
        requiredEducation: formData.requiredEducation,
        requiredExperience: formData.requiredExperience,
        numberOfVacencies: parseInt(formData.numberOfVacencies),
        shiftDetails: formData.shiftDetails,
        status: formData.status
      };
      // Get hrManagerId from sessionStorage
      const hrManagerId = sessionStorage.getItem('userId');
      const response = await vacancyService.createVacancy(vacancy, hrManagerId);
      if (response.success) {
        toast.success("Vacancy created successfully!");
        onSave(response.data);
        onClose();
      } else {
        toast.error(response.message || "Failed to create vacancy");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      toast.error("Error creating vacancy: " + errorMessage);
      console.error("Error creating vacancy:", error);
      console.error("Full error response:", error.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Create New Vacancy
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title & Department */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Location & Employment Type */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <select
                  value={formData.employementType}
                  onChange={(e) =>
                    setFormData({ ...formData, employementType: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the position"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Detailed Job Description
              </label>
              <textarea
                required
                rows={3}
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed job description and requirements"
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Responsibilities
              </label>
              <textarea
                required
                rows={3}
                value={formData.reponsibilites}
                onChange={(e) =>
                  setFormData({ ...formData, reponsibilites: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Key responsibilities and duties"
              />
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Salary ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.minSalary}
                  onChange={(e) =>
                    setFormData({ ...formData, minSalary: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Salary ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.maxSalary}
                  onChange={(e) =>
                    setFormData({ ...formData, maxSalary: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Application Deadline & Number of Vacancies */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  required
                  value={formData.applicationDeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, applicationDeadline: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Vacancies
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.numberOfVacencies}
                  onChange={(e) =>
                    setFormData({ ...formData, numberOfVacencies: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Required Education & Experience */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Education
                </label>
                <input
                  type="text"
                  required
                  value={formData.requiredEducation}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredEducation: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Bachelor's Degree in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Required Experience
                </label>
                <input
                  type="text"
                  required
                  value={formData.requiredExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredExperience: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3+ years of experience"
                />
              </div>
            </div>

            {/* Shift Details & Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shift Details
                </label>
                <input
                  type="text"
                  required
                  value={formData.shiftDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, shiftDetails: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 9 AM - 6 PM, Monday to Friday"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CLOSED">Closed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Vacancy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateVacancyModal;
