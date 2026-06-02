import React, { useState} from "react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetSubjectQuery } from "../redux/services/subjectApi";
import { useGetHomeworkQuery } from "../redux/services/homeworkApi";

const Homework = () => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = "6a1a97c85db3525d452b63f7";

  const {data: availableClasses = []} = useGetClassesQuery(schoolId);
  const {data: subject = []} = useGetSubjectQuery({classId: selectedClassId, schoolId}, {skip: !selectedClassId});
  const {data: responses = []} = useGetHomeworkQuery({classId: selectedClassId, subjectId: selectedSubjectId},{skip: !selectedClassId || !selectedSubjectId});

  const homeworkList = responses?.data || [];

  const totalPages = Math.max(1, Math.ceil(homeworkList.length / itemsPerPage));
  const currentHomework = homeworkList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Homework List
          </h2>
          <p className="text-gray-500 text-sm">
            View assigned homework by class
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

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>Select Subject</option>
            {subject.map((sub, index) => (
              <option key={index} value={sub._id || sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">Assigned Homework</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  S.No
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Class Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Subject Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Date
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Homework
                </th>
                 <th className="px-6 py-4 font-semibold tracking-wide">
                  Status
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentHomework.length > 0 ? (
                currentHomework.map((hw, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {hw.className || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {hw.subjectName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {hw.date ? new Date(hw.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-md truncate" title={hw.message}>
                      {hw.message || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            alwaysShow={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Homework;