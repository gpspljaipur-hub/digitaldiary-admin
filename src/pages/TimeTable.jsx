import React, { useState} from "react";
import { Plus, X, Eye } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetSubjectQuery } from "../redux/services/subjectApi";
import { useGetTeacherQuery } from "../redux/services/teacherApi";
import { useGetTimeTableQuery, useAddTimeTableMutation } from "../redux/services/timeTableApi";

const TimeTable = () => {
  const [showTimeTableForm, setShowTimeTableForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [timeTableForm, setTimeTableForm] = useState({
    teacherId: "",
    classId: "",
    subjectId: "",
    day : "",
    startTime: "",
    endTime: "",
    roomNo : "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");
  const {data : response = []} = useGetTeacherQuery(schoolId, {skip: !showTimeTableForm});
  const teachers  = response?.data || [];
  const {data: classes = []} = useGetClassesQuery(schoolId);
  const {data: formSubjects = []} = useGetSubjectQuery({schoolId, classId: timeTableForm.classId}, {skip: !timeTableForm.classId});
  const {data: timeTable = []} = useGetTimeTableQuery({schoolId, classId: selectedClass}, {skip: !selectedClass});
  const [addTimeTable] = useAddTimeTableMutation();
  
  const handleTimeTableChange = (e) => {
    setTimeTableForm({
      ...timeTableForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeTableSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...timeTableForm,
        schoolId,
      };
      await addTimeTable(payload).unwrap();
      setTimeTableForm({
        teacherId: "",
        classId: "",
        subjectId: "",
        day: "",
        startTime: "",
        endTime: "",
        roomNo : "",
  
      });
      setShowTimeTableForm(false);
    } catch (error) {
      console.error("Error adding time table:", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(timeTable.length / itemsPerPage));
  const currentTimeTable = timeTable.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Time Table
          </h2>
          <p className="text-gray-500 text-sm">
            Manage time tables of classes
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowTimeTableForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Time Table
          </button>
        </div>
      </div>



      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50 w-full">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">Class Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide w-24">S.No</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Teacher</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Class</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Subject</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Day</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Time</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentTimeTable.length > 0 ? (
                currentTimeTable.map((time, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 font-medium">{time.teacherId.name || time.name}</td>
                    <td className="px-6 py-4 font-medium">{time.classId.name || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{time.subjectId.name || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{time.day || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{time.startTime && time.endTime ? `${time.startTime} - ${time.endTime}` : "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{time.roomNo || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
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

      {showTimeTableForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Time Table Schedule</h2>
              <button
                type="button"
                onClick={() => setShowTimeTableForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleTimeTableSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teacher</label>
                    <select 
                  name = "teacherId"
                  value={timeTableForm.teacherId}
                  onChange={ handleTimeTableChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
              >
                  <option value="" disabled>Select Teacher</option>
                  {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                          {teacher.name}
                      </option>
                  ))}
              </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
                  <select
                    name="classId"
                    value={timeTableForm.classId}
                    onChange={(e) => {
                      handleTimeTableChange(e);
                      setTimeTableForm(prev => ({ ...prev, subjectId: "" }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
                    required
                  >
                    <option value="" disabled>Select Class</option>
                    {classes.map((cls, idx) => (
                      <option key={idx} value={cls._id || cls.id}>{cls.className || cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                  <select
                    name="subjectId"
                    value={timeTableForm.subjectId}
                    onChange={handleTimeTableChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
                    required
                    disabled={!timeTableForm.classId}
                  >
                    <option value="" disabled>Select Subject</option>
                    {formSubjects.map((sub, idx) => (
                      <option key={idx} value={sub._id || sub.id}>{sub.name || sub.subjectName}</option>
                    ))}
                  </select>
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Day</label>
                  <input
                    type="text"
                    name="day"
                    placeholder="e.g. Monday"
                    value={timeTableForm.day}
                    onChange={handleTimeTableChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={timeTableForm.startTime}
                    onChange={handleTimeTableChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={timeTableForm.endTime}
                    onChange={handleTimeTableChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Room No</label>
                  <input
                    type="text"
                    name="roomNo"
                    placeholder="e.g. A-101"
                    value={timeTableForm.roomNo}
                    onChange={handleTimeTableChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => setShowTimeTableForm(false)}
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
};

export default TimeTable;
