import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Marks = () => {
  const [marksList, setMarksList] = useState([]);
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

  const fetchMarks = async (classId) => {
    setSelectedClassId(classId);
    if (!classId) {
      setMarksList([]);
      return;
    }
    try {
      const data = await apiService.getMarks({ classId });
      setMarksList(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };
  return (
    <div className="relative">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Marks List</h1>
            <div className="flex gap-4 w-full sm:w-auto">
              <select
                value={selectedClassId}
                onChange={(e) => fetchMarks(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
              >
                <option value="" disabled>Select a Class to view marks</option>
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
                                Student Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                class Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Subject Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Exam Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Marks Obtained
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {marksList.length > 0 ? (
                          marksList.map((mark, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {mark.studentName || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {mark.className || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {mark.subjectName || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {mark.examTypeName || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                {mark.marks}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-10 text-center text-gray-500" colSpan="6">
                                  No Marks Found
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

export default Marks;