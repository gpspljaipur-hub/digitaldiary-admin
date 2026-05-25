import React, { useState, useEffect } from "react";
import { apiService } from "../config/apiService";

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [showClassForm, setShowClassForm] = useState(false);
  const [classForm, setClassForm] = useState({
    name: "",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await apiService.getClasses();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleClassChange = (e) => {
    setClassForm({
      ...classForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.addClass(classForm);
      await fetchClasses();

      setClassForm({
        name: "",
      });
      setShowClassForm(false);
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
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
        </button>6
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-fit min-w-[350px]">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.length > 0 ? (
                classes.map((cls, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cls.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-10 text-gray-500">
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
                name="name"
                placeholder="Class Name"
                value={classForm.name}
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
  );
};

export default Class;
