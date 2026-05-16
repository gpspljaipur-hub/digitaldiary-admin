import React, { useState, useEffect } from 'react';
import { apiService } from '../config/apiService';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    message: "",
    classId: "",
    status: ""
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchNotices = async (classId) => {
    setSelectedClassId(classId);
    if (!classId) {
      setNotices([]);
      return;
    }
    try {
      const data = await apiService.getNotice({ classId });
      setNotices(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await apiService.getClasses();
      setAvailableClasses(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleChange = (e) => {
    setNoticeForm({
      ...noticeForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting notice:", noticeForm);
      await apiService.addNotice(noticeForm);
      fetchNotices(selectedClassId || noticeForm.classId);
      setNoticeForm({ title: "", message: "", classId: "", status: "" });
      setShowNoticeForm(false);
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to add notice. Please try again.");
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          School Notices
        </h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={selectedClassId}
            onChange={(e) => fetchNotices(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]"
          >
            <option value="" disabled>Select a Class to view notice</option>
            {availableClasses.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium whitespace-nowrap"
            onClick={() => setShowNoticeForm(true)}
          >
            Add Notice
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${notice.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {notice.status}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {notice.message}
              </p>
              {notice.classData && notice.classData.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {notice.classData.map((cls, idx) => (
                    <div key={idx} className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                      {cls.className}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg font-medium">No Notices Found</p>
            <p className="text-gray-400 text-sm mt-1">Click on "Add Notice" to create a new one.</p>
          </div>
        )}
      </div>

      {showNoticeForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 relative shadow-2xl">
            <button
              onClick={() => setShowNoticeForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Notice</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter notice title"
                  value={noticeForm.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Class</label>
                  <select
                    name="classId"
                    value={noticeForm.classId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>Select Class</option>
                    {availableClasses.map((cls, idx) => (
                      <option key={idx} value={cls._id || cls.id}>{cls.className || cls.name}</option>
                    ))}
                  </select>
                </div>
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  placeholder="Enter notice message"
                  value={noticeForm.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
                  required
                ></textarea>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={noticeForm.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value ="" disabled>Select Status</option>
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-2 transition-colors"
              >
                Submit Notice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notice;
