import React, { useState, useEffect } from 'react';
import { apiService } from '../config/apiService';
import Select from 'react-select';
import { Plus, X } from 'lucide-react';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    message: "",
    classId: [],
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
      fetchNotices(selectedClassId || (noticeForm.classId.length > 0 ? noticeForm.classId[0] : ""));
      setNoticeForm({ title: "", message: "", classId: [], status: "" });
      setShowNoticeForm(false);
    } catch (error) {
      console.log("Error adding notice:", error);
      alert("Failed to add notice. Please try again.");
    }
  };

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            School Notices
          </h2>
          <p className="text-gray-500 text-sm">
            Manage and view announcements for classes
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedClassId}
            onChange={(e) => fetchNotices(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>Select a Class to view notice</option>
            {availableClasses.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
          <button
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
            onClick={() => setShowNoticeForm(true)}
          >
            <Plus size={20} />
            Add Notice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div key={index} className="bg-white p-6 rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-xl font-bold text-[#0B132B]">{notice.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${notice.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {notice.status}
                  </span>
                </div>
              
                <p className="text-gray-600 leading-relaxed mb-4">
                  {notice.message.split(" ").slice(0, 20).join(" ")}
                  {notice.message.split(" ").length > 20 && "..."}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setSelectedNotice(notice)}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm mb-4"
                >
                  More Info...
                </button>
                
                {notice.classData && notice.classData.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {notice.classData.map((cls, idx) => (
                      <div key={idx} className="inline-block bg-[#eef7ff] text-[#0066b2] text-xs font-semibold px-3 py-1.5 rounded-lg">
                        {cls.className}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-[20px] border border-gray-50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
            <p className="text-gray-500 text-lg font-medium">No Notices Found</p>
            <p className="text-gray-400 text-sm mt-1">Click on "Add Notice" to create a new one.</p>
          </div>
        )}
      </div>

      {showNoticeForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add New Notice</h2>
              <button
                type="button"
                onClick={() => setShowNoticeForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notice Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter notice title"
                  value={noticeForm.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                />
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Target Class</label>
                  <Select
                    isMulti
                    name="classId"
                    options={availableClasses.map(cls => ({ value: cls._id || cls.id, label: cls.className || cls.name }))}
                    value={availableClasses
                      .filter(cls => noticeForm.classId.includes(cls._id || cls.id))
                      .map(cls => ({ value: cls._id || cls.id, label: cls.className || cls.name }))}
                    onChange={(selectedOptions) => {
                      setNoticeForm({
                        ...noticeForm,
                        classId: selectedOptions ? selectedOptions.map(option => option.value) : []
                      });
                    }}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select Classes"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    placeholder="Enter notice message"
                    value={noticeForm.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-h-[120px] resize-y"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                  <select
                    name="status"
                    value={noticeForm.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                  </select>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={() => setShowNoticeForm(false)}
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

      {selectedNotice && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  {selectedNotice.title}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedNotice.status === "normal"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedNotice.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="mb-8 border-l-4 border-[#0A1629] pl-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {selectedNotice.message}
                </p>
              </div>

              {selectedNotice.classData && selectedNotice.classData.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Visible To</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotice.classData.map((cls, idx) => (
                      <div
                        key={idx}
                        className="bg-[#eef7ff] text-[#0066b2] text-xs font-semibold px-4 py-2 rounded-xl"
                      >
                        {cls.className}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedNotice(null)}
                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Notice;
