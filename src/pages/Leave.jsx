import React, { useState, useEffect } from 'react';
import { apiService } from '../config/apiService';
import { X } from 'lucide-react';

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const data = await apiService.getTeacher();
      setTeacher(data || []);
    } catch (error) {
      console.log("Error fetching teachers", error);
    }
  };

  useEffect(() => {
    if (selectedTeacherId) {
      fetchStudents(selectedTeacherId);
    } else {
      setStudent([]);
      setSelectedStudentId("");
      setLeaves([]);
    }
  }, [selectedTeacherId]);

  const fetchStudents = async (teacherId) => {
    try {
      const data = await apiService.getStudents({ teacherId });
      setStudent(data || []);
    } catch (error) {
      console.log("Error fetching students", error);
      setStudent([]);
    }
  };

  useEffect(() => {
    if (selectedStudentId) {
      fetchLeaves(selectedStudentId);
    } else {
      setLeaves([]);
    }
  }, [selectedStudentId]);

  const fetchLeaves = async (studentId) => {
    try {
      let data = await apiService.getLeave({ studentId });
      setLeaves(data || []);
    } catch (error) {
      console.log("Error fetching leaves", error);
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

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Leave Management
          </h2>
          <p className="text-gray-500 text-sm">
            View and manage student leave requests
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>Select Teacher</option>
            {teacher && teacher.map((t, index) => (
              <option key={t._id || index} value={t._id || t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px] disabled:opacity-50 disabled:bg-gray-50"
            disabled={!selectedTeacherId}
          >
            <option value="" disabled>Select Student</option>
            {student && student.map((s, index) => (
              <option key={s._id || index} value={s._id || s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">All Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Serial No.
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Start Date
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  End Date
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
              {leaves && leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave._id || leave.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {leave.studentName || leave.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(leave.startDate).toLocaleDateString() || "—"}

                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(leave.endDate).toLocaleDateString() || "—"}
                    </td>
                   <td className="px-6 py-4 text-gray-600 max-w-xs">

                        <p className="truncate">
                          {leave.message
                            ? leave.message.split(" ").slice(0, 5).join(" ")
                            : "—"}

                          {leave.message?.split(" ").length > 5 && "..."}
                        </p>

                        {leave.message?.split(" ").length > 5 && (
                          <button
                            onClick={() => setSelectedLeave(leave)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-2"
                          >
                            More Info...
                          </button>
                        )}

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusColor(leave.status)}`}>
                          {leave.status || "—"}
                        </span>
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No Leave Request Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedLeave && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  Leave Details
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusColor(selectedLeave.status)}`}
                >
                  {selectedLeave.status || "N/A"}
                </span>
              </div>
              <button
                onClick={() => setSelectedLeave(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="grid gap-6 mb-8 bg-[#f8f9fc] p-5 rounded-2xl border border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                    Student
                  </p>
                  <p className="text-lg font-bold text-[#0B132B]">
                    {selectedLeave.studentName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="text-[#0B132B] font-semibold">
                    {selectedLeave.startDate
                      ? new Date(selectedLeave.startDate).toLocaleDateString("en-IN")
                      : "N/A"}{" "}
                    -{" "}
                    {selectedLeave.endDate
                      ? new Date(selectedLeave.endDate).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  Message
                </h4>
                <div className="border-l-4 border-[#0A1629] pl-4 max-h-52 overflow-y-auto">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                    {selectedLeave.message || "No Message"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedLeave(null)}
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

export default Leave;
