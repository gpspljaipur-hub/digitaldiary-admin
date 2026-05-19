import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const ExamType = () => {
  const [exam, setExam] = useState([]);
  const [showExamForm, setShowExamForm] = useState(false);
  const [examForm, setExamForm] = useState({
    name: "",
  });

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

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Exam Type List
        </h2>
        <button
          onClick={() => setShowExamForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Add Exam 
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-fit min-w-[350px]">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Exam Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exam.length > 0 ? (
                exam.map((exm, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exm.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-10 text-gray-500">
                    No Exam Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showExamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
            <button
              onClick={() => setShowExamForm(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-8">Add Exam</h2>
            <form onSubmit={handleExamSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                placeholder="Exam Name"
                value={examForm.name}
                onChange={handleExamChange}
                className="border p-3 rounded-lg"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamType;
