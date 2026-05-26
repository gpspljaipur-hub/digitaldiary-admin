import React, { useState, useEffect } from "react";
import { addTeacher } from "../config/apiService";
import { apiService } from "../config/apiService";
import Select from "react-select";
import { Plus, X } from "lucide-react";
const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    classIds: [],
    subjectIds: [],
  });

  useEffect(() => {
    fetchTeacher();
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await apiService.getClasses();
      setClasses(data);
    } catch (error) {
      console.log("Error fetching classes", error);
    }
  };

  const fetchSubject = async (classId) => {
    if (!classId) {
      setSubject([]);
      return;
    }
    try {
      const data = await apiService.getSubjects({ classId });
      setSubject(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.log("Error fetching subjects", error);
    }
  };

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
      let schoolId = localStorage.getItem('schoolId');
      if (!schoolId || schoolId === 'undefined' || schoolId === 'null') {
        try {
          const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
          schoolId = adminData?.schoolId?._id || adminData?.schoolId || null;
        } catch (e) {
          schoolId = null;
        }
      }

      const payload = {
        name: teacherForm.name,
        email: teacherForm.email,
        password: teacherForm.password,
        classIds: teacherForm.classIds,
        subjectIds: teacherForm.subjectIds,
        schoolId: schoolId,
      };

      const response = await addTeacher(payload);

      if (response?.success || response?.message || response?._id || response) {
        alert("Teacher added successfully!");
        await fetchTeacher();

        setTeacherForm({
          name: "",
          email: "",
          password: "",
          classIds: [],
          subjectIds: []
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
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Teachers List
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your school teachers and assign classes
          </p>
        </div>

        <div className="mt-4 md:mt-0">
            <button
            onClick={() => setShowTeacherForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
            <Plus size={20} />
            Add Teacher
            </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]">All Teachers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Email
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Subjects
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Classes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {teacher.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={teacher.subjectIds ? teacher.subjectIds.map((s) => s.name).join(", ") : ""}>
                      {teacher.subjectIds && teacher.subjectIds.length > 0
                        ? teacher.subjectIds.map((s) => s.name).join(", ")
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={teacher.classIds ? teacher.classIds.map((s) => s.name).join(", ") : ""}>
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
                    className="px-6 py-8 text-center text-gray-500"
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">
                Add New Teacher
              </h2>
              <button
                type="button"
                onClick={() => setShowTeacherForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={teacherForm.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rahul@school.com"
                    value={teacherForm.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter secure password"
                    value={teacherForm.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-2 mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classes
                </label>

                <Select
                  isMulti
                  options={classes.map((c) => ({
                    value: c._id || c.id,
                    label: c.className || c.name,
                  }))}

                  value={classes
                    .filter((c) =>
                      teacherForm.classIds.includes(c._id || c.id)
                    )
                    .map((c) => ({
                      value: c._id || c.id,
                      label: c.className || c.name,
                    }))
                  }

                  onChange={(selectedOptions) => {
                    const selectedClassIds = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];

                    setTeacherForm({
                      ...teacherForm,
                      classIds: selectedClassIds,
                      subjectIds: [],
                    });

                    if (selectedClassIds.length > 0) {
                      fetchSubject(selectedClassIds[0]);
                    } else {
                      setSubject([]);
                    }
                  }}

                  styles={{
                    control: (base) => ({
                        ...base,
                        padding: '4px',
                        borderRadius: '0.75rem',
                        borderColor: '#e5e7eb',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: '#d1d5db'
                        }
                    })
                  }}
                  placeholder="Select Classes"
                />
              </div>

              <div className="col-span-2 mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Subjects
                </label>

                <Select
                  isMulti
                  options={subject.map((s) => ({
                    value: s._id || s.id,
                    label: s.name || s.subjectName,
                  }))}

                  value={subject
                    .filter((s) =>
                      teacherForm.subjectIds.includes(s._id || s.id)
                    )
                    .map((s) => ({
                      value: s._id || s.id,
                      label: s.name || s.subjectName,
                    }))
                  }

                  onChange={(selectedOptions) => {
                    setTeacherForm({
                      ...teacherForm,
                      subjectIds: selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [],
                    });
                  }}
                  
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select Subjects"
                  styles={{
                    control: (base) => ({
                        ...base,
                        padding: '4px',
                        borderRadius: '0.75rem',
                        borderColor: '#e5e7eb',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: '#d1d5db'
                        }
                    })
                  }}
                />
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setShowTeacherForm(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
