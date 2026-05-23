import React, { useState, useEffect } from 'react';
import { apiService } from '../config/apiService';

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
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Leave Management
        </h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
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
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Serial No.
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
                  Message
                </th>
                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaves && leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={leave._id || leave.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {leave.studentName || leave.name || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(leave.startDate).toLocaleDateString() || "—"}

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(leave.endDate).toLocaleDateString() || "—"}
                    </td>
                   <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">

                        <p>
                          {leave.message
                            ? leave.message.split(" ").slice(0, 5).join(" ")
                            : "—"}

                          {leave.message?.split(" ").length > 5 && "..."}
                        </p>

                        {leave.message?.split(" ").length > 5 && (
                          <button
                            onClick={() => setSelectedLeave(leave)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                          >
                            More Info...
                          </button>
                        )}

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

                  <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl">

                    <button
                      onClick={() => setSelectedLeave(null)}
                      className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-600"
                    >
                      &times;
                    </button>

                    <div className="flex justify-between items-center mb-5">

                      <h2 className="text-2xl font-bold text-gray-800">
                        Leave Details
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedLeave.status)}`}
                      >
                        {selectedLeave.status || "N/A"}
                      </span>

                    </div>

                    <div className="space-y-4 text-sm">

                      <div>
                        <span className="font-semibold text-gray-700">
                          Student:
                        </span>{" "}
                        <span className="text-gray-600">
                          {selectedLeave.studentName || "N/A"}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-gray-700">
                          Duration:
                        </span>{" "}
                        <span className="text-gray-600">
                          {selectedLeave.startDate
                            ? new Date(selectedLeave.startDate).toLocaleDateString("en-IN")
                            : "N/A"}{" "}
                          -{" "}
                          {selectedLeave.endDate
                            ? new Date(selectedLeave.endDate).toLocaleDateString("en-IN")
                            : "N/A"}
                        </span>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 mb-2">
                          Message:
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-52 overflow-y-auto">
                          <p className="text-gray-600 leading-7 whitespace-pre-line">
                            {selectedLeave.message || "No Message"}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}


    </div>
  );
};

export default Leave;
