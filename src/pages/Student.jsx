import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import {
  useGetStudentQuery,
  useAddStudentMutation,
} from "../redux/services/studentApi";
import { useGetTeacherQuery } from "../redux/services/teacherApi";

const Student = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showStudentForm, setShowStudentForm] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: "",
    teacherId: "",
    classId: "",
  });

  const schoolId = localStorage.getItem("schoolId");

  const { data: classes = [] } = useGetClassesQuery(schoolId);
  const { data: response1 = [] } = useGetStudentQuery(
    { schoolId, classId: selectedClass },
    { skip: !selectedClass },
  );
  const students = response1?.data || [];
  const [addStudent] = useAddStudentMutation();
  const { data: response = [] } = useGetTeacherQuery(schoolId);
  const teachers = response?.data || [];

  const handleStudentChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...studentForm,
        schoolId,
      };

      await addStudent(payload);
      setStudentForm({ name: "", teacherId: "", classId: "" });
      setShowStudentForm(false);
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(students.length / itemsPerPage));
  const currentStudents = students?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Student List
          </h2>
          <p className="text-gray-500 text-sm">Manage and view students</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>
              Select Class
            </option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowStudentForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>
      </div>
      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0B132B]">All Students</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">S.No</th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Student Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Class Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Teacher Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {loading ? (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-gray-500"
                    colSpan="4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentStudents && currentStudents.length > 0 ? (
                currentStudents.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item.name || "—"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {classes.find((c) => c._id === item.classId)?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {teachers.find((t) => t._id === item.teacherId)?.name ||
                        "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-10 text-center text-gray-500"
                    colSpan="4"
                  >
                    No Students Found
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

      {showStudentForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Student</h2>
              <button
                type="button"
                onClick={() => setShowStudentForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleStudentSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student's full name"
                  value={studentForm.name}
                  onChange={handleStudentChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Assign Teacher
                  </label>
                  <select
                    name="teacherId"
                    value={studentForm.teacherId}
                    onChange={handleStudentChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Teacher
                    </option>
                    {teachers.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Assign Class
                  </label>
                  <select
                    name="classId"
                    value={studentForm.classId}
                    onChange={handleStudentChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    {classes.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStudentForm(false)}
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

export default Student;
