import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

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
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Subjects List
        </h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <select 
            value={selectedClassId}
            onChange={(e) => fetchSubjects(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
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
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium whitespace-nowrap"
          >
            Add Subject
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subjects.length > 0 ? (
                subjects.map((sub, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sub.name || sub.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowSubjectForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Subject</h2>
            <form onSubmit={handleSubjectSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter subject name"
                  value={subjectForm.name}
                  onChange={handleSubjectChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="classId"
                  value={subjectForm.classId}
                  onChange={handleSubjectChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-2 transition-colors"
              >
                Submit Subject
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
