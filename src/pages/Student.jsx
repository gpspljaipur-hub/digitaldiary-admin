import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [loading, setLoading] = useState(false);

    const [showStudentForm, setShowStudentForm] = useState(false);
    const [studentForm, setStudentForm] = useState({
        name: "",
        teacherId: "",
        classId: ""
    });

    useEffect(() => {
        fetchTeachers();
        fetchClasses();
    }, []);

    const fetchTeachers = async () => {
        try {
            const data = await apiService.getTeacher();
            setTeachers(data || []);
        } catch (error) {
            console.log("Error fetching teachers", error);
        }
    };

    const fetchClasses = async () => {
        try {
            const data = await apiService.getClasses();
            setClasses(data || []);
        } catch (error) {
            console.log("Error fetching classes", error);
        }
    };

    useEffect(() => {
        if (selectedTeacher) {
            fetchStudents();
        }
    }, [selectedTeacher]);

    const fetchStudents = async () => {
        if (!selectedTeacher) return;
        
        try {
            setLoading(true);
            const response = await apiService.getStudents({ teacherId: selectedTeacher });
            setStudents(response);
        } catch (error) {
            console.error("Error fetching students", error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStudentChange = (e) => {
        setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            let schoolId = localStorage.getItem('schoolId');
            if (!schoolId || schoolId === 'undefined' || schoolId === 'null') {
                try {
                    const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
                    schoolId = adminData?.schoolId?._id || adminData?.schoolId || null;
                } catch (err) {
                    schoolId = null;
                }
            }

            const payload = {
                ...studentForm,
                schoolId
            };

            await apiService.addStudent(payload);
            if (selectedTeacher === studentForm.teacherId) {
                fetchStudents();
            }
            setStudentForm({ name: "", teacherId: "", classId: "" });
            setShowStudentForm(false);
        } catch (error) {
            console.error("Error adding student", error);
        }
    };

  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Student List</h1>
            <div className="flex gap-4 items-center">
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
                <button
                    onClick={() => setShowStudentForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                    Add Student
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
                                Teacher Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="4">
                                    Loading...
                                </td>
                            </tr>
                        ) : students && students.length > 0 ? (
                            students.map((item, index) => (
                                <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {classes.find((c) => c._id === item.classId)?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {teachers.find((t) => t._id === item.teacherId)?.name || "—"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-10 text-center text-gray-500" colSpan="4">
                                    No Students Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {showStudentForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
                    <button
                        onClick={() => setShowStudentForm(false)}
                        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Add Student</h2>
                    <form onSubmit={handleStudentSubmit} className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Student Name"
                            value={studentForm.name}
                            onChange={handleStudentChange}
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                        <select
                            name="teacherId"
                            value={studentForm.teacherId}
                            onChange={handleStudentChange}
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select Teacher</option>
                            {teachers.map((t) => (
                                <option key={t._id} value={t._id}>{t.name}</option>
                            ))}
                        </select>
                        <select
                            name="classId"
                            value={studentForm.classId}
                            onChange={handleStudentChange}
                            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select Class</option>
                            {classes.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors mt-2"
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

export default Student;
