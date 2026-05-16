import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Homework = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
         try {
             const data = await apiService.getClasses();
             setAvailableClasses(data || []);
         } catch (error) {
             console.log("Error fetching classes", error);
         }
     };

  const fetchHomework = async (classId) => {
    setSelectedClassId(classId);
    if (!classId) {
      setHomeworkList([]);
      return;
    }
    try {
      const data = await apiService.getHomework({ classId });
      setHomeworkList(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching homework:", error);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Homework List
        </h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={selectedClassId}
            onChange={(e) => fetchHomework(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
          >
            <option value="" disabled>Select a Class to view homework</option>
            {availableClasses.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
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
                  Class Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Homework
                </th>
                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {homeworkList.length > 0 ? (
                homeworkList.map((hw, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {hw.className || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {hw.subjectName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {hw.date ? new Date(hw.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={hw.message}>
                      {hw.message || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hw.isImportant ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {hw.isImportant ? "Important" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No Homework Found
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

export default Homework;
