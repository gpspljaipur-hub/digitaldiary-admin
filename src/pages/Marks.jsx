import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { useGetMarksQuery, useLazyGetReportCardQuery } from "../redux/services/marksApi";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetStudentQuery } from "../redux/services/studentApi";
import { useGetExamTypeQuery } from "../redux/services/examTypeApi";
import { BASE_URL } from "../redux/services/api";
import { FileText } from "lucide-react";

const Marks = () => {
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");
  const {data : availableClasses = []} = useGetClassesQuery(schoolId);
  const {data : response = []} = useGetMarksQuery({schoolId, classId: selectedClassId, studentId: selectedStudentId, examType: selectedExamType}, {skip: !selectedClassId || !selectedExamType});
  const marksList = response?.data || [];
  const {data: students = []} = useGetStudentQuery({schoolId, classId: selectedClassId}, {skip: !selectedClassId});
  const {data: examType = []} = useGetExamTypeQuery({schoolId});
  const uniqueExamTypes = [...new Set(examType.map(item => item.examType || item.name))].filter(Boolean);

  const [triggerGetReportCard] = useLazyGetReportCardQuery();

  const handleViewReportCard = async (mark) => {
    try {
      const response = await triggerGetReportCard({
        schoolId,
        classId: mark.classId?._id || mark.classId,
        studentId: mark.studentId?._id || mark.studentId,
        examType: mark.examType
      }).unwrap();

      if (response?.success && response?.link) {
        const url = response.link.startsWith("http")
          ? response.link
          : `${BASE_URL}/${response.link.replace(/^\/?uploads\/uploads\//, "uploads/").replace(/^\//, "")}`;
        window.open(url, "_blank");
      } else {
        alert("Report card not available.");
      }
    } catch (error) {
      console.error("Failed to fetch report card:", error);
      alert("Failed to fetch report card. Please try again later.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(marksList.length / itemsPerPage));
  const currentMarks = marksList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B132B] mb-2">Marks List</h2>
              <p className="text-gray-500 text-sm">
                View students to marks by the class
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select
                value={selectedExamType}
                onChange={(e) => {
                  setSelectedExamType(e.target.value);
                  setSelectedClassId("");
                  setSelectedStudentId("");
                  setCurrentPage(1);
                }}
                className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
              >
                <option value="" disabled>Select Exam Type</option>
                {uniqueExamTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  setSelectedStudentId("");
                  setCurrentPage(1);
                }}
                className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
                disabled={!selectedExamType}
              >
                <option value="" disabled>Select Class</option>
                {availableClasses.map((cls, index) => (
                  <option key={index} value={cls._id || cls.id}>
                    {cls.className || cls.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
                disabled={!selectedClassId}
              >
                <option value="">All Students</option>
                {students.map((stu, index) => (
                  <option key={index} value={stu._id || stu.id}>
                    {stu.name || sub.studentName}
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
                            <th className="px-6 py-4 font-semibold tracking-wide text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[#374151]">
                        {currentMarks.length > 0 ? (
                          currentMarks.map((mark, index) => (
                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.studentId?.name || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.classId?.name || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {mark.subjectId?.name || "N/A"}
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                {mark.examType || "N/A"}
                              </td>
                              <td className="px-6 py-4 font-bold text-[#0A1629]">
                                {mark.marks !== undefined ? `${mark.marks} / ${mark.totalMarks || '-'}` : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-center">
                                  <button
                                    onClick={() => handleViewReportCard(mark)}
                                    className="flex items-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 px-3 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shadow-sm"
                                  >
                                    <FileText size={14} />
                                    Report Card
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                              <td className="px-6 py-10 text-center text-gray-500" colSpan="7">
                                  No Marks Found
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

export default Marks;