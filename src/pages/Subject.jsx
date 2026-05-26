import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";
import { Plus, X } from "lucide-react";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    name: "",
    classId: "",
  });

  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchSubjects = async (classId) => {
    setSelectedClassId(classId);
    if (!classId) {
      setSubjects([]);
      return;
    }
    try {
      const data = await apiService.getSubjects({ classId });
      setSubjects(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await apiService.getClasses();
      setAvailableClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSubjectChange = (e) => {
    setSubjectForm({
      ...subjectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.addSubject(subjectForm);
      if (selectedClassId === subjectForm.classId || !selectedClassId) {
        fetchSubjects(subjectForm.classId);
      }
      setSubjectForm({
        name: "",
        classId: "",
      });
      setShowSubjectForm(false);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Subjects List
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your school subjects and filter by class
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            value={selectedClassId}
            onChange={(e) => fetchSubjects(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="">Select a Class to View</option>
            {availableClasses.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowSubjectForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Subject
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">All Subjects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  S.No
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Subject Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Class Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {subjects.length > 0 ? (
                subjects.map((sub, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {sub.name || sub.subjectName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {sub.classId?.name || sub.className}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    No Subjects Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showSubjectForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add New Subject</h2>
              <button
                type="button"
                onClick={() => setShowSubjectForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubjectSubmit} className="p-6">
              <div className="flex flex-col gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter subject name"
                    value={subjectForm.name}
                    onChange={handleSubjectChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
                  <select
                    name="classId"
                    value={subjectForm.classId}
                    onChange={handleSubjectChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="" disabled>Select a Class</option>
                    {availableClasses.map((cls, index) => (
                      <option key={index} value={cls._id || cls.id}>
                        {cls.className || cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setShowSubjectForm(false)}
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

export default Subject;
