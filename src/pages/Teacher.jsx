import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetSubjectQuery} from "../redux/services/subjectApi";
import { useGetTeacherQuery, useAddTeacherMutation } from "../redux/services/teacherApi";
const Teacher = () => {
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    classIds: [],
    subjectIds: [],
    isClassTeacher: "",
    classTeacherOf: ""
  });

  const schoolId = localStorage.getItem("schoolId");

  const {data: classes = []} = useGetClassesQuery(schoolId, {skip: !showTeacherForm});
  const {data: subject = []} = useGetSubjectQuery({schoolId}, {
    skip: !teacherForm.classIds.length,
  });
  const {data: response = []} = useGetTeacherQuery(schoolId);
  const [addTeacher] = useAddTeacherMutation();
  const teachers = response?.data || [];

 const filteredSubjects = [
  ...new Map(
    subject
      .filter((sub) =>
        teacherForm.classIds.includes(sub.classId?._id)
      )
      .map((sub) => [sub.name.toLowerCase(), sub])
  ).values(),
];

useEffect(() => {
  setTeacherForm((prev) => {
    const validSubjectIds = prev.subjectIds.filter((subjectId) =>
      filteredSubjects.some((sub) => sub._id === subjectId)
    );

    if (
      validSubjectIds.length === prev.subjectIds.length
    ) {
      return prev;
    }

    return {
      ...prev,
      subjectIds: validSubjectIds,
    };
  });
}, [teacherForm.classIds]);

  const handleChange = (e) => {
    setTeacherForm({
      ...teacherForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const payload = {
      name: teacherForm.name,
      email: teacherForm.email,
      password: teacherForm.password,
      classIds: teacherForm.classIds,
      subjectIds: teacherForm.subjectIds,
      isClassTeacher: teacherForm.isClassTeacher,
      classTeacherOf: teacherForm.isClassTeacher === "true"
      ? teacherForm.classTeacherOf: null,
      schoolId,
    };

     await addTeacher(payload).unwrap();
    alert("Teacher added successfully!");

    setTeacherForm({
      name: "",
      email: "",
      password: "",
      classIds: [],
      subjectIds: [],
      isClassTeacher: "",
      classTeacherOf: ""
    });

    setShowTeacherForm(false);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  const totalPages = Math.max(1, Math.ceil(teachers.length / itemsPerPage));
  const currentTeachers = teachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                  Subjects
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Classes
                </th>
                 <th className="px-6 py-4 font-semibold tracking-wide">
                  Class Teacher
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {teacher.name}
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
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={teacher.classIds ? teacher.classIds.map((s) => s.name).join(", ") : ""}>
                      {teacher.classTeacherOf?.name || "-"}
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
        
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            alwaysShow={true}
          />
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

                    setTeacherForm((prev) => ({
                        ...prev,
                        classIds: selectedClassIds,
                    }));
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
                  options={filteredSubjects.map((s) => ({
                    value: s._id,
                    label: s.name,
                  }))}

                 value={filteredSubjects
                  .filter((s) =>
                    teacherForm.subjectIds.includes(s._id)
                  )
                  .map((s) => ({
                    value: s._id,
                    label: s.name,
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

              <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Is Class Teacher
                    </label>

                    <select
                      name="isClassTeacher"
                      value={teacherForm.isClassTeacher}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    >
                      <option value="" disabled>Select Option</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>

                  {teacherForm.isClassTeacher === "true" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Class Teacher Of
                    </label>

                    <select
                      name="classTeacherOf"
                      value={teacherForm.classTeacherOf}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    >
                      <option value="" >Select Class</option>

                      {classes
                        .filter((c) =>
                          teacherForm.classIds.includes(c._id || c.id)
                        )
                        .map((c) => (
                          <option
                            key={c._id || c.id}
                            value={c._id || c.id}
                          >
                            {c.name || c.className}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

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
