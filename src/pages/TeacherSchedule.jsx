import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";

const TeacherSchedule = () => {
    const [schedule, setSchedule] = useState([]);
    const [Class, setClass] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [subject, setSubject] = useState([]);
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({
        teacherId: "",
        subjectId: "",
        classId: "",
        date: "",
        time: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(()=> {
        fetchSchedule();
        fetchClass();
        fetchTeacher();
        fetchSubject();
    }, []);

    const fetchTeacher = async () => {
        try {
            const data = await apiService.getTeacher();
            setTeacher(data || []);
        } catch (error) {
            console.log("Error fetching teachers", error);
        }
    };

    const fetchSubject = async (classId) => {
        try {
            const data = await apiService.getSubjects(classId ? { classId } : {});
            setSubject(Array.isArray(data) ? data : (data?.data || []));
        } catch (error) {
            console.log("Error fetching subjects", error);
        }
    };

    const fetchClass = async () => {
        try{
            const data = await apiService.getClasses();
            setClass(data || []);
        } catch(error){
            console.log("Error fetching classes", error);
        }
    };

    const fetchSchedule = async () =>{
    try{
         const data = await apiService.getTeacherSchedule();
         setSchedule(data || []);
    } catch(error){
        console.log("Error fetching teacher schedule", error);
    }
    };

     const handleScheduleChange = (e) => {
    setScheduleForm({
      ...scheduleForm,
      [e.target.name]: e.target.value,
    });
  };

   const handleScheduleSubmit = async (e) => {
     e.preventDefault();
 
     try {
       await apiService.addTeacherSchedule(scheduleForm);
       await fetchSchedule();
 
       setScheduleForm({
         teacherId: "",
         subjectId: "",
         classId: "",
         date: "",
         time: ""
       });
       setShowScheduleForm(false);
     } catch (error) {
       console.error("Error adding teacher schedule:", error);
     }
   };

   const totalPages = Math.max(1, Math.ceil(schedule.length / itemsPerPage));
   const currentSchedule = schedule.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0B132B] mb-2">Teacher Schedule List</h1>
              <p className="text-gray-500 text-sm">
                Manage and assign schedules to teachers
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                  onClick={() => setShowScheduleForm(true)}
                  className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
              >
                <Plus size={20} />
                Add Teacher Schedule
              </button>
            </div>
        </div>

        <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#0B132B]">All Schedules</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#f8f9fc] text-[#6b7280]">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                S.No
                            </th>
                            <th className="px-6 py-4 font-semibold tracking-wide">
                                Teacher Name
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
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[#374151]">
                        {currentSchedule && currentSchedule.length > 0 ? (
                            currentSchedule.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {item.teacherId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {item.classId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {item.subjectId?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {item.date ? new Date(item.date).toLocaleDateString() : "—"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {item.time || "—"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="6">
                                    No Schedule Found
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

        {showScheduleForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Teacher Schedule</h2>
              <button
                type="button"
                onClick={() => setShowScheduleForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teacher</label>
                <select
                  name="teacherId"
                  value={scheduleForm.teacherId}
                  onChange={handleScheduleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teacher.map((t, i) => (
                    <option key={i} value={t._id || t.id}>{t.name || t.teacherName}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
                  <select
                    name="classId"
                    value={scheduleForm.classId}
                    onChange={(e) => {
                       handleScheduleChange(e);
                       fetchSubject(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="">Select Class</option>
                    {Class.map((c, i) => (
                      <option key={i} value={c._id || c.id}>{c.className || c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                  <select
                    name="subjectId"
                    value={scheduleForm.subjectId}
                    onChange={handleScheduleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subject.map((s, i) => (
                      <option key={i} value={s._id || s.id}>{s.name || s.subjectName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={scheduleForm.date}
                    onChange={handleScheduleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                  <input
                    type="text"
                    name="time"
                    placeholder="e.g. 09:00 AM-11:00 AM"
                    value={scheduleForm.time}
                    onChange={handleScheduleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => setShowScheduleForm(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
                >
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default TeacherSchedule;