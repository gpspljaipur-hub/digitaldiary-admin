import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Complain = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });

  const handleCategoryChange = (e) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addComplaintCategory(categoryForm);
      setCategoryForm({ name: "" });
      setShowCategoryForm(false);
    } catch (error) {
      console.error("Error adding complaint category:", error);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700'; 
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const response = await apiService.getComplaint();
      setComplains(response.data || []);
    } catch (error) {
      console.error("Error fetching complaint:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Complaints List
        </h2>
        <button
          onClick={() => setShowCategoryForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Add Complaint Category
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
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : complains.length > 0 ? (
                complains.map((complain, index) => (
                  <tr key={complain._id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {complain.studentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {complain.categoryName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <p>
                      {complain.message
                       ? complain.message.split(" ").slice(0, 5).join(" ")
                          : "N/A"}

                          {complain.message?.split(" ").length > 5 && "..."}
                    </p>
                          
                         {complain.message?.split(" ").length > 5 && (
                           <button
                             onClick={() => setSelectedComplaint(complain)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                              >
                                More Info...
                                          </button>
                          )}
                        </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(complain.status)}`}>
                        {complain.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No Complaints Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
            <button
              onClick={() => setShowCategoryForm(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-8">Add Complaint Category</h2>
            <form onSubmit={handleCategorySubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={categoryForm.name}
                onChange={handleCategoryChange}
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

      {selectedComplaint && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

    <div className="bg-white w-full max-w-2xl rounded-2xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">

      <button
        onClick={() => setSelectedComplaint(null)}
        className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>

      <div className="flex justify-between items-start gap-4 mb-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Complaint Details
          </h2>

          <p className="text-gray-500 text-sm">
            Full complaint information
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedComplaint.status)}`}
        >
          {selectedComplaint.status || "N/A"}
        </span>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Student Name
          </p>

          <p className="font-semibold text-gray-800">
            {selectedComplaint.studentName || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Complaint Category
          </p>

          <p className="font-semibold text-gray-800">
            {selectedComplaint.categoryName || "N/A"}
          </p>
        </div>

      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">
          Complaint Message
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

          <p className="text-gray-700 leading-8 whitespace-pre-line">
            {selectedComplaint.message || "No Message"}
          </p>

        </div>
      </div>

      {selectedComplaint.files &&
  selectedComplaint.files.length > 0 && (

    <div>
      <p className="font-semibold text-gray-700 mb-2">
        Attached Files:
      </p>

      <div className="flex flex-wrap gap-4">

        {selectedComplaint.files.map((file, index) => (

            <a
              href={`https://digitaldiry-backend.onrender.com/${file}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`https://digitaldiry-backend.onrender.com/${file}`}
                alt="View PDF"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform"
              />
            </a>

        ))}

      </div>
    </div>

)}

    </div>

  </div>
)}

    </div>
  );
};

export default Complain
