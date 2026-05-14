import React, { useState, useEffect } from 'react';

const Leave = () => {
  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem("leaves_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse leaves from localStorage");
      }
    }
    return [
      {
        id: 1,
        studentName: "Rahul Kumar",
        startDate: "2026-05-15",
        endDate: "2026-05-16",
        description: "Fever and cold since last night",
        status: "Pending"
      },
      {
        id: 2,
        studentName: "Priya Singh",
        startDate: "2026-05-20",
        endDate: "2026-05-22",
        description: "Attending a family function out of station",
        status: "Approved"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("leaves_data", JSON.stringify(leaves));
  }, [leaves]);

  const toggleStatus = (id) => {
    setLeaves(prevLeaves => 
      prevLeaves.map(leave => {
        if (leave.id === id) {
          return { ...leave, status: leave.status === "Pending" ? "Approved" : "Pending" };
        }
        return leave;
      })
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Leave Management
        </h2>
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
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {leave.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {leave.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {leave.endDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={leave.description}>
                      {leave.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <span 
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            leave.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                        {leave.status === 'Pending' && (
                          <button
                            onClick={() => toggleStatus(leave.id)}
                            className="text-blue-600 hover:text-blue-900 font-medium text-xs border border-blue-200 hover:bg-blue-50 px-2 py-1 rounded"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No Leave Requests Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
