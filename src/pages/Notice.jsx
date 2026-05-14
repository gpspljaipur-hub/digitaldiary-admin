import React, { useState, useEffect } from 'react';

const Notice = () => {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notices from localStorage");
      }
    }
    return [
      {
        title: "Exam Schedule Announced",
        description: "The final examination schedule for the academic year 2026 has been published. All class teachers are requested to download the timetable from the portal and share it with their respective students by this Friday.",
        classId: "All Classes",
        status: "Active"
      },
      {
        title: "Sports Day Meeting",
        description: "A mandatory meeting for all PE teachers and house captains will be held tomorrow in the main auditorium to discuss the preparations for the upcoming Annual Sports Day.",
        classId: "10th A",
        status: "Active"
      },
      {
        title: "Summer Vacation Notice",
        description: "The school will remain closed for summer vacations starting from 1st June. The campus will reopen on 1st July. Teachers must submit all final grades before the start of the break.",
        classId: "All Classes",
        status: "Inactive"
      }
    ];
  });

  const availableClasses = ["All Classes", "10th A", "9th B", "8th A", "11th Science", "12th Commerce"];

  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    description: "",
    classId: "",
    status: "Active"
  });

  useEffect(() => {
    localStorage.setItem("notices_data", JSON.stringify(notices));
  }, [notices]);

  const handleChange = (e) => {
    setNoticeForm({
      ...noticeForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isDuplicate = notices.some(
      (notice) => 
        notice.title.trim().toLowerCase() === noticeForm.title.trim().toLowerCase() && 
        notice.classId === noticeForm.classId &&
        notice.description.trim().toLowerCase() === noticeForm.description.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("This notice has already been published for this class.");
      return;
    }

    setNotices(prevNotices => [noticeForm, ...prevNotices]);
    setNoticeForm({ title: "", description: "", classId: "", status: "Active" });
    setShowNoticeForm(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          School Notices
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
          onClick={() => setShowNoticeForm(true)}
        >
          Add Notice
        </button>
      </div>

      <div className="grid gap-6">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${notice.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {notice.status}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {notice.description}
              </p>
              {notice.classId && (
                <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                  Target Class: {notice.classId}
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

              <div className="grid grid-cols-2 gap-4">
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
                      <option key={idx} value={cls}>{cls}</option>
                    ))}
                  </select>
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
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter notice description"
                  value={noticeForm.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg min-h-[120px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
                  required
                ></textarea>
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
