import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";

const ExamType = () => {
  const [exam, setExam] = useState([]);
  const [showExamForm, setShowExamForm] = useState(false);
  const [examForm, setExamForm] = useState({
    name: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchExam();
  }, []);

  const fetchExam = async () => {
    try {
      const data = await apiService.getExamType();
      setExam(data);
    } catch (error) {
      console.error("Error fetching exam:", error);
    }
  };

  const handleExamChange = (e) => {
    setExamForm({
      ...examForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.addExamType(examForm);
      await fetchExam();

      setExamForm({
        name: "",
      });
      setShowExamForm(false);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(exam.length / itemsPerPage));
  const currentExam = exam.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Exam Type List
          </h2>
          <p className="text-gray-500 text-sm">
            Manage different types of exams
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowExamForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Exam 
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50 w-full md:w-1/2">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">All Exam Types</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide w-24">
                  S.No
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Exam Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentExam.length > 0 ? (
                currentExam.map((exm, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 font-medium">{exm.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-10 text-center text-gray-500">
                    No Exam Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            alwaysShow={true}
          />
        </div>
      </div>

      {showExamForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Exam</h2>
              <button
                type="button"
                onClick={() => setShowExamForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleExamSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Exam Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Mid Term Exam"
                  value={examForm.name}
                  onChange={handleExamChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                />
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => setShowExamForm(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
                >
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamType;
