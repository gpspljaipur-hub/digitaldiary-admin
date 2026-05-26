import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";
import { Plus, X } from "lucide-react";

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
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Complaints List
          </h2>
          <p className="text-gray-500 text-sm">
            Manage and resolve student complaints
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowCategoryForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">All Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  S.No
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Category
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Message
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : complains.length > 0 ? (
                complains.map((complain, index) => (
                  <tr key={complain._id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {complain.studentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {complain.categoryName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs">
                      <p className="truncate">
                        {complain.message
                         ? complain.message.split(" ").slice(0, 5).join(" ")
                            : "N/A"}

                        {complain.message?.split(" ").length > 5 && "..."}
                      </p>
                            
                      {complain.message?.split(" ").length > 5 && (
                        <button
                          onClick={() => setSelectedComplaint(complain)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-2"
                        >
                          More Info...
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(complain.status)}`}>
                        {complain.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No Complaints Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCategoryForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Complaint Category</h2>
              <button
                type="button"
                onClick={() => setShowCategoryForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Facilities, Staff, Academics"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                />
              </div>
              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setShowCategoryForm(false)}
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

      {selectedComplaint && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  Complaint Details
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(selectedComplaint.status)}`}
                >
                  {selectedComplaint.status || "N/A"}
                </span>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-[#f8f9fc] p-5 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                    Student Name
                  </p>
                  <p className="text-lg font-bold text-[#0B132B]">
                    {selectedComplaint.studentName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                    Complaint Category
                  </p>
                  <p className="text-lg font-bold text-[#0B132B]">
                    {selectedComplaint.categoryName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  Complaint Message
                </h4>
                <div className="border-l-4 border-[#0A1629] pl-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                    {selectedComplaint.message || "No Message"}
                  </p>
                </div>
              </div>

              {selectedComplaint.files && selectedComplaint.files.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                    Attached Files
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {selectedComplaint.files.map((file, index) => (
                        <a
                          key={index}
                          href={`https://digitaldiry-backend.onrender.com/${file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-105"
                        >
                          <img
                            src={`https://digitaldiry-backend.onrender.com/${file}`}
                            alt="Attached file"
                            className="w-32 h-32 object-cover"
                          />
                        </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedComplaint(null)}
                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Complain
