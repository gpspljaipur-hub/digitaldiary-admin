import React, { useState, useEffect } from "react";
import { addTeacher } from "../config/apiService";
import { apiService } from "../config/apiService";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    schoolName: "",
    password: "",
    subjects: "",
  });

  useEffect(() => {
      fetchTeacher();
    }, []);
  
    const fetchTeacher = async () => {
      try {
        const data = await apiService.getTeacher();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

  const handleChange = (e) => {
    setTeacherForm({
      ...teacherForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: teacherForm.name,
        email: teacherForm.email,
        schoolName: teacherForm.schoolName,
        password: teacherForm.password,
        subject: teacherForm.subjects, 
      };

      const response = await addTeacher(payload);

      if (response?.success || response?.message || response?._id || response) {
        alert("Teacher added successfully!");
        setTeachers([
          ...teachers,
          { ...teacherForm },
        ]);

        setTeacherForm({
          name: "",
          email: "",
          schoolName: "",
          password: "",
          subjects: "",
        });

        setShowTeacherForm(false);
      } else {
        alert(response?.message || 'Failed to add teacher');
      }
    } catch (error) {
      console.error("Add teacher error:", error);
      alert(error.response?.data?.message || 'Failed to add teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Teachers List
        </h2>

        <button
          onClick={() => setShowTeacherForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Add Teacher
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  School Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subjects
                </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Classes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4">
                      {teacher.schoolName}
                    </td>
                    <td className="px-6 py-4">
                      {teacher.subjectIds && teacher.subjectIds.length > 0
                        ? teacher.subjectIds.map((s) => s.name).join(", ")
                        : "—"}
                    </td>
                     <td className="px-6 py-4">
                      {teacher.classIds && teacher.classIds.length > 0
                        ? teacher.classIds.map((s) => s.name).join(", ")
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No Teachers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showTeacherForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-8 relative">
            <button
              onClick={() => setShowTeacherForm(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-8">
              Add Teacher
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={teacherForm.name}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={teacherForm.email}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={teacherForm.schoolName}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={teacherForm.password}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="subjects"
                placeholder="ClassName"
                value={teacherForm.subjects}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg col-span-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
