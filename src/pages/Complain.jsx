import React, { useState } from "react";

const Complain = () => {
  const [complains, setComplains] = useState([]);
  const [showComplainForm, setShowComplainForm] = useState(false);
  const [complainForm, setComplainForm] = useState({
    categoryId: "",
    description: "",
  });

  // Demo categories for the dropdown
  const availableCategories = [
    { id: "CAT-001", name: "Infrastructure" },
    { id: "CAT-002", name: "Academics" },
    { id: "CAT-003", name: "Staff Behavior" },
    { id: "CAT-004", name: "Other" }
  ];

  const handleComplainChange = (e) => {
    setComplainForm({
      ...complainForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplainSubmit = (e) => {
    e.preventDefault();

    setComplains([...complains, complainForm]);

    setComplainForm({
      categoryId: "",
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
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
                  Category ID
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
                      {complain.categoryId}
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowComplainForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Complain</h2>
            <form onSubmit={handleComplainSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                <select
                  name="categoryId"
                  value={complainForm.categoryId}
                  onChange={handleComplainChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select a Category</option>
                  {availableCategories.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.id} - {cat.name}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-2 transition-colors"
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
