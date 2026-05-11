import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Notice from "./Notice";
import Leave from "./Leave";

const Dashboard = () => {
  const { tab } = useParams();
  const activeTab = tab || "teacher";

  const [teachers, setTeachers] = useState([]);
  const [showTeacherForm, setShowTeacherForm] = useState(false);

  const [classes, setClasses] = useState([]);
  const [showClassForm, setShowClassForm] = useState(false);
  const [classForm, setClassForm] = useState({
    className: "",
  });

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    schoolName: "",
    password: "",
    subjects: "",
  });

  const handleChange = (e) => {
    setTeacherForm({
      ...teacherForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTeachers([
      ...teachers,
      teacherForm,
    ]);

    setTeacherForm({
      name: "",
      email: "",
      schoolName: "",
      password: "",
      subjects: "",
    });

    setShowTeacherForm(false);
  };

  const handleClassChange = (e) => {
    setClassForm({
      ...classForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassSubmit = (e) => {
    e.preventDefault();

    setClasses([
      ...classes,
      classForm,
    ]);

    setClassForm({
      className: "",
    });

    setShowClassForm(false);
  };


  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <div className="flex-1 p-10">

        {activeTab === "teacher" && (
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
                            {teacher.subjects}
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
                      placeholder="Subjects"
                      value={teacherForm.subjects}
                      onChange={handleChange}
                      className="border p-3 rounded-lg col-span-2"
                    />

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg col-span-2"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "class" && (
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Classes List
              </h2>
              <button
                onClick={() => setShowClassForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
              >
                Add Class
              </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Class Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classes.length > 0 ? (
                      classes.map((cls, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4">{cls.className}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center py-10 text-gray-500">
                          No Classes Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {showClassForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white w-full max-w-lg rounded-xl p-8 relative">
                  <button
                    onClick={() => setShowClassForm(false)}
                    className="absolute top-4 right-4 text-2xl"
                  >
                    ×
                  </button>
                  <h2 className="text-3xl font-bold mb-8">Add Class</h2>
                  <form onSubmit={handleClassSubmit} className="flex flex-col gap-5">
                    <input
                      type="text"
                      name="className"
                      placeholder="Class Name"
                      value={classForm.className}
                      onChange={handleClassChange}
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
        )}

        {activeTab === "notice" && (
          <Notice />
        )}

        {activeTab === "leave" && (
          <Leave />
        )}
      </div>
    </div>
  );
};

export default Dashboard;