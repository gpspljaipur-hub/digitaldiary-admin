import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

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

  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Teacher Schedule Lists</h1>
              <button
          onClick={() => setShowScheduleForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Add Teacher Schedule </button>
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

        {showScheduleForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
            <button
              onClick={() => setShowScheduleForm(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-8">Add Teacher Schedule</h2>
            <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-5">
              <select
                name="teacherId"
                value={scheduleForm.teacherId}
                onChange={handleScheduleChange}
                className="border p-3 rounded-lg"
                required
              >
                <option value="">Select Teacher</option>
                {teacher.map((t, i) => (
                  <option key={i} value={t._id || t.id}>{t.name || t.teacherName}</option>
                ))}
              </select>

              <select
                name="classId"
                value={scheduleForm.classId}
                onChange={(e) => {
                   handleScheduleChange(e);
                   fetchSubject(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
              >
                <option value="">Select Class</option>
                {Class.map((c, i) => (
                  <option key={i} value={c._id || c.id}>{c.className || c.name}</option>
                ))}
              </select>

              <select
                name="subjectId"
                value={scheduleForm.subjectId}
                onChange={handleScheduleChange}
                className="border p-3 rounded-lg"
                required
              >
                <option value="">Select Subject</option>
                {subject.map((s, i) => (
                  <option key={i} value={s._id || s.id}>{s.name || s.subjectName}</option>
                ))}
              </select>

              <input
                type="date"
                name="date"
                value={scheduleForm.date}
                onChange={handleScheduleChange}
                className="border p-3 rounded-lg"
                required
              />
              
              <input
                type="text"
                name="time"
                placeholder="Time (e.g. 09:00 AM-11:00 AM)"
                value={scheduleForm.time}
                onChange={handleScheduleChange}
                className="border p-3 rounded-lg"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default TeacherSchedule;