import React, { useState} from "react";
import { useGetMarksQuery } from "../redux/services/marksApi";
import { useGetClassesQuery } from "../redux/services/classApi";

const Marks = () => {
  const [selectedClassId, setSelectedClassId] = useState("");

  const schoolId = "6a1a97c85db3525d452b63f7"
  const {data : availableClasses = []} = useGetClassesQuery(schoolId);
  const {data : marksList = []} = useGetMarksQuery({schoolId, classId: selectedClassId}, {skip: !selectedClassId});


  return (
    <div className="w-full h-full p-2 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B132B] mb-2">Marks List</h2>
              <p className="text-gray-500 text-sm">
                View student marks by class
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
              >
                <option value="" disabled>Select Class</option>
                {availableClasses.map((cls, index) => (
                  <option key={index} value={cls._id || cls.id}>
                    {cls.className || cls.name}
                  </option>
                ))}
              </select>
            </div>
        </div>
        <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#0B132B]">Student Marks</h3>
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
                                Class Name
                            </th>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                Subject Name
                            </th>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                Exam Name
                            </th>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                Marks Obtained
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[#374151]">
                        {marksList.length > 0 ? (
                          marksList.map((mark, index) => (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.studentName || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.className || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.subjectName || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {mark.examTypeName || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-bold text-[#0A1629]">
                                {mark.marks}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
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