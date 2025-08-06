
import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import VacancyCard from "./VacancyCard";
import CreateVacancyModal from "./CreateVacancy";
import EditVacancyModal from "./EditVacancy";
import { vacancyService } from "../../services/vacancy";
import { toast } from "react-hot-toast";

function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  useEffect(() => {
    fetchVacancies();
  }, [currentPage, searchTerm]);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const response = await vacancyService.getAllVacancies(searchTerm, currentPage, pageSize);
      if (response.success) {
        setVacancies(response.data);
      } else {
        toast.error(response.message || "Failed to fetch vacancies");
      }
    } catch (error) {
      toast.error("Error fetching vacancies");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVacancy = async (vacancyData) => {
    try {
      const response = await vacancyService.createVacancy(vacancyData);
      if (response.success) {
        toast.success("Vacancy created successfully");
        setShowCreateModal(false);
        fetchVacancies();
      } else {
        toast.error(response.message || "Failed to create vacancy");
      }
    } catch (error) {
      toast.error("Error creating vacancy: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  const handleUpdateVacancy = async (id, vacancyData) => {
    try {
      const response = await vacancyService.updateVacancy(id, vacancyData);
      if (response.success) {
        toast.success("Vacancy updated successfully");
        setSelectedVacancy(null);
        fetchVacancies();
      } else {
        toast.error(response.message || "Failed to update vacancy");
      }
    } catch (error) {
      toast.error("Error updating vacancy");
      console.error(error);
    }
  };

  const handleDeleteVacancy = async (id) => {
    if (window.confirm("Are you sure you want to delete this vacancy?")) {
      try {
        const response = await vacancyService.deleteVacancy(id);
        if (response.success) {
          toast.success("Vacancy deleted successfully");
          fetchVacancies();
        } else {
          toast.error(response.message || "Failed to delete vacancy");
        }
      } catch (error) {
        toast.error("Error deleting vacancy");
        console.error(error);
      }
    }
  };

  const filteredVacancies = vacancies.filter((vacancy) => 
    filterStatus === "All" || vacancy.status === filterStatus
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vacancies</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage job openings and track application progress.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Vacancy
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search vacancies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Vacancies Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredVacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onEdit={(v) => setSelectedVacancy(v)}
            onDelete={handleDeleteVacancy}
          />
        ))}
      </div>

      {/* Create Vacancy Modal */}
      {showCreateModal && (
        <CreateVacancyModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateVacancy}
        />
      )}
      {selectedVacancy && (
        <EditVacancyModal
          vacancy={selectedVacancy}
          onClose={() => setSelectedVacancy(null)}
          onSave={(updatedVacancy) => {
            setVacancies(
              vacancies.map((v) =>
                v.id === updatedVacancy.id ? updatedVacancy : v
              )
            );
            setSelectedVacancy(null);
          }}
        />
      )}
    </div>
  );
}
export default Vacancies;
