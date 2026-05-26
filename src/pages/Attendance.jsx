import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Attendance = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTeacher();
    }, []);

    const fetchTeacher = async () => {
        try {
            const data = await apiService.getTeacher();
            setTeachers(data || []);
        } catch (error) {
            console.log("Error fetching teacher", error);
        }
    };

   const fetchAttendance = async () => {
    if (!selectedTeacher || !selectedDate) {
        alert("Please select both a teacher and a date");
        return;
    }
    try {
        setLoading(true);

        const [year, month, day] = selectedDate.split("-");
        
        const response = await apiService.getAttendance({
            teacherId: selectedTeacher,
            date: `${month}/${day}/${year}`
        });

        setAttendanceRecords(response.data || []);

    } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceRecords([]);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="w-full h-full p-2 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0B132B] mb-2">Attendance List</h2>
              <p className="text-gray-500 text-sm">
                View student attendance records
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select 
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
              >
                  <option value="" disabled>Select Teacher</option>
                  {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                          {teacher.name}
                      </option>
                  ))}
              </select>

              <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
              />
              <button
                  onClick={fetchAttendance}
                  disabled={loading}
                  className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  {loading ? "Searching..." : "Search"}
              </button>
          </div>
        </div>
        
        <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">  
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#0B132B]">Attendance Records</h3>
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
                                Date
                            </th>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[#374151]">
                        {loading ? (
                            <tr>
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="5">
                                    Loading...
                                </td>
                            </tr>
                        ) : attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record, index) => (
                                <tr key={record._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {record.studentName}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {record.className}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(record.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            record.status?.toLowerCase() === 'present' 
                                                ? 'bg-green-100 text-green-700' 
                                                : record.status?.toLowerCase() === 'absent'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {record.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '-'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="5">
                                    No Attendance Records Found
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

export default Attendance;