import React, { useState } from "react";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    subjectName: "",
    className: "",
  });

  
  const availableClasses = ["10th A", "9th B", "8th A", "11th Science", "12th Commerce"];

  const handleSubjectChange = (e) => {
    setSubjectForm({
      ...subjectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();

    setSubjects(prev => [...prev, subjectForm]);

    setSubjectForm({
      subjectName: "",
      className: "",
    });

    setShowSubjectForm(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Subjects List
        </h2>
        <button
          onClick={() => setShowSubjectForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Add Subject
        </button>
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
                      {sub.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sub.className}
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
                  name="subjectName"
                  placeholder="Enter subject name"
                  value={subjectForm.subjectName}
                  onChange={handleSubjectChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="className"
                  value={subjectForm.className}
                  onChange={handleSubjectChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a Class</option>
                  {availableClasses.map((cls, index) => (
                    <option key={index} value={cls}>
                      {cls}
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
