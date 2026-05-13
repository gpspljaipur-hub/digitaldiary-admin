import React, { useState } from "react";

const Complain = () => {
  const [complains, setComplains] = useState([]);
  const [showComplainForm, setShowComplainForm] = useState(false);
  const [complainForm, setComplainForm] = useState({
    category: "",
    description: "",
  });

  const availableCategories = [
    "Infrastructure",
    "Academics",
    "Staff Behavior",
    "Other"
  ];

  const handleComplainChange = (e) => {
    setComplainForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleComplainSubmit = (e) => {
    e.preventDefault();

    setComplains(prev => [...prev, complainForm]);

    setComplainForm({
      category: "",
      description: "",
    });

    setShowComplainForm(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Complaints List
        </h2>
        <button
          onClick={() => setShowComplainForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium shadow-sm transition-all active:scale-95"
        >
          Add Complain
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
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complains.length > 0 ? (
                complains.map((complain, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {complain.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {complain.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    No Complaints Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showComplainForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative shadow-2xl animate-[slideUp_0.3s_ease-out]">
            <button
              onClick={() => setShowComplainForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Complain</h2>
            <form onSubmit={handleComplainSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={complainForm.category}
                  onChange={handleComplainChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a Category</option>
                  {availableCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter complain description"
                  value={complainForm.description}
                  onChange={handleComplainChange}
                  rows={4}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-2 transition-colors active:scale-[0.98]"
              >
                Submit Complain
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complain;
