import React, { useState, useMemo } from "react";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetFeesQuery, useAddFeesMutation } from "../redux/services/feesApi";

const FeesStructure = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");

  const [formData, setFormData] = useState({
    classId: "",
    feeType: "",
    amount: "",
    frequency: "",
    dueDay: "",
    description: "",
  });

  const [selectedClassId, setSelectedClassId] = useState("");

  const { data: classes = [] } = useGetClassesQuery(schoolId);
  const { data: response = {} } = useGetFeesQuery({ schoolId });
  const [addFees, { isLoading }] = useAddFeesMutation();
  
  const feesStructures = response?.data || [];

  const filteredFees = useMemo(() => {
    return selectedClassId
      ? feesStructures.filter((fee) => fee.classId?._id === selectedClassId)
      : feesStructures;
  }, [feesStructures, selectedClassId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
        schoolId,
      };

      await addFees(payload).unwrap();
      alert("Fees structure added successfully!");

      setFormData({
        classId: "",
        feeType: "",
        amount: "",
        frequency: "",
        dueDay: "",
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("Failed to add fees structure.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(filteredFees.length / itemsPerPage));
  const currentFees = filteredFees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Fees Structure
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your school's fees structure and components
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name || c.className}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Fees Structure
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0B132B]">All Fees Structures</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">Class</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Fee Type</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Amount</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Frequency</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Due Date</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentFees.length > 0 ? (
                currentFees.map((fee, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {fee.classId?.name || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{fee.feeType || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">₹{fee.amount || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 capitalize">{fee.frequency || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{fee.dueDay || "-"}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={fee.description}>
                      {fee.description || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No Fees Structures Found
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

      {showForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-[#0B132B]">
                Add Fees Structure
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  >
                    <option value="" disabled>Select Class</option>
                    {classes.map((c) => (
                      <option key={c._id || c.id} value={c._id || c.id}>
                        {c.name || c.className}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fee Type</label>
                  <input
                    type="text"
                    name="feeType"
                    placeholder="e.g. Tuition Fee"
                    value={formData.feeType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="e.g. 2500"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Frequency</label>
                  <select
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  >
                    <option value="" disabled>Select Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="half-yearly">Half-Yearly</option>
                    <option value="yearly">Yearly</option>
                    <option value="one-time">One-Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Due Day</label>
                  <input
                    type="text"
                    name="dueDay"
                    placeholder="e.g. 10-06-2026 or 10th of every month"
                    value={formData.dueDay}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="e.g. Monthly tuition fee"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesStructure;