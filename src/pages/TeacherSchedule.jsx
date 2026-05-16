import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const TeacherSchedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(()=> {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () =>{
    try{
         const data = await apiService.getTeacherSchedule();
         setSchedule(data || []);
    } catch(error){
        console.log("Error fetching teacher schedule", error);
    }
    };
  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Teacher Schedule List</h1>
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
                                Teacher Name
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
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule && schedule.length > 0 ? (
                            schedule.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.teacherId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.classId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.subjectId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.date ? new Date(item.date).toLocaleDateString() : "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.time || "—"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="6">
                                    No Schedule Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default TeacherSchedule;