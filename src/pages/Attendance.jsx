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
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Attendance List</h1>

            <div className="flex gap-4 ">
            <select 
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
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
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
                onClick={fetchAttendance}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Searching..." : "Search"}
            </button>
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
                                Class Name  
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="5">
                                    Loading...
                                </td>
                            </tr>
                        ) : attendanceRecords.length > 0 ? (
                            attendanceRecords.map((record, index) => (
                                <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.studentName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {record.className}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(record.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            record.status?.toLowerCase() === 'present' 
                                                ? 'bg-green-100 text-green-800' 
                                                : record.status?.toLowerCase() === 'absent'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {record.status ? record.status.charAt(0).toUpperCase() + record.status.slice(1) : '-'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="hover:bg-gray-50 transition-colors">
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