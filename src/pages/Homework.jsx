import React, { useState } from "react";
import { X, Eye, Paperclip } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetSubjectQuery } from "../redux/services/subjectApi";
import { useGetHomeworkQuery } from "../redux/services/homeworkApi";
import { BASE_URL } from "../redux/services/api";

const getFileUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `${BASE_URL}/${filePath.replace(/^\/?uploads\/uploads\//, "uploads/").replace(/^\//, "")}`;
};

const Homework = () => {
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");

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
                  Status
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide text-center">
                  Action
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
                      {hw.date ? new Date(hw.date).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hw.isImportant ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {hw.isImportant ? "Important" : "Normal"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedHomework(hw)}
                          className="flex items-center gap-1.5 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shadow-sm"
                        >
                          <Eye size={14} />
                          More Info
                        </button>
                        {hw.files && hw.files.length > 0 && (
                          <button
                            onClick={() => window.open(getFileUrl(hw.files[0]), "_blank")}
                            className="flex items-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 px-3 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shadow-sm"
                          >
                            <Paperclip size={14} />
                            View Attachment
                          </button>
                        )}
                      </div>
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

      {selectedHomework && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  Homework Details
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedHomework.isImportant ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {selectedHomework.isImportant ? "Important" : "Normal"}
                </span>
              </div>
              <button
                onClick={() => setSelectedHomework(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Class</h4>
                  <p className="text-gray-900 font-medium">{selectedHomework.className || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Subject</h4>
                  <p className="text-gray-900 font-medium">{selectedHomework.subjectName || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Teacher</h4>
                  <p className="text-gray-900 font-medium">{selectedHomework.teacherName || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Date</h4>
                  <p className="text-gray-900 font-medium">
                    {selectedHomework.date ? new Date(selectedHomework.date).toLocaleDateString("en-GB") : "N/A"}
                  </p>
                </div>
              </div>

              <div className="mb-6 border-l-4 border-[#0A1629] pl-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Message</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {selectedHomework.message || "No description provided."}
                </p>
              </div>

              {selectedHomework.files && selectedHomework.files.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Attachments</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedHomework.files.map((file, idx) => (
                      <button
                        key={idx}
                        onClick={() => window.open(getFileUrl(file), "_blank")}
                        className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        <Paperclip size={16} />
                        View Attachment {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedHomework(null)}
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

export default Homework;