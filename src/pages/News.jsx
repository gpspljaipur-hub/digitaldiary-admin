import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetNewsQuery, useAddNewsMutation } from "../redux/services/newsApi";


const formatTime12h = (timeStr) => {
  if (!timeStr) return "";
  if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const [hourString, minute] = timeStr.split(":");
  if (!hourString || !minute) return timeStr;
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + " " + (hour < 12 ? "AM" : "PM");
};

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    type: "event",
    startTime: "",
    endTime: "",
    venue: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const { data: newsData } = useGetNewsQuery({ schoolId });
  const [addNews, { isLoading }] = useAddNewsMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("schoolId", schoolId);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    
    const formattedDate = formData.eventDate
      ? formData.eventDate.split("-").reverse().join("-")
      : "";
    payload.append("eventDate", formattedDate);
    
    payload.append("type", formData.type);
    payload.append("startTime", formatTime12h(formData.startTime));
    payload.append("endTime", formatTime12h(formData.endTime));
    payload.append("venue", formData.venue);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      await addNews(payload).unwrap();
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        eventDate: "",
        type: "event",
        startTime: "",
        endTime: "",
        venue: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add news:", error);
      alert("Failed to add news.");
    }
  };

  const newsList = Array.isArray(newsData) ? newsData : (newsData?.data || []);

  const totalPages = Math.max(1, Math.ceil(newsList.length / itemsPerPage));
  const currentNews = newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            News & Events
          </h2>
          <p className="text-gray-500 text-sm">
            Manage school news, events, and announcements
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add News
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0B132B]">All News & Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">Image</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Title</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Type</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Event Date</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Venue</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentNews.length > 0 ? (
                currentNews.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {item.image ? (
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `https://digitaldiry-backend.onrender.com/${
                                  item.image
                                    .replace(/^\/?uploads\/uploads\//, "uploads/")
                                    .replace(/^\//, "")
                                }`
                          }
                          alt="News"
                          className="w-10 h-10 rounded-lg object-contain bg-gray-50"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.title || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 capitalize">
                      {item.type || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.venue || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedNews(item)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm whitespace-nowrap"
                      >
                        More Info..
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No News Found
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

      {showForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-[#0B132B]">
                Add News / Event
              </h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Academic Day Celebration"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
                  >
                    <option value="event">Event</option>
                    <option value="news">News</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Date</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    placeholder="e.g. School Auditorium"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="Provide details about the event or news..."
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  ></textarea>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0A1629] file:text-white hover:file:bg-[#112443]"
                  />
                  {imageFile && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="w-32 h-32 object-contain rounded-xl border border-gray-200 bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedNews && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  {selectedNews.title || "News Details"}
                </h2>
                {selectedNews.type && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {selectedNews.type}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {selectedNews.image && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={
                      selectedNews.image.startsWith("http")
                        ? selectedNews.image
                        : `https://digitaldiry-backend.onrender.com/${
                            selectedNews.image
                              .replace(/^\/?uploads\/uploads\//, "uploads/")
                              .replace(/^\//, "")
                          }`
                    }
                    alt="News"
                    className="max-w-full max-h-64 object-contain rounded-xl border border-gray-100"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Event Date</h4>
                  <p className="text-gray-900 font-medium">
                    {selectedNews.eventDate ? new Date(selectedNews.eventDate).toLocaleDateString() : "—"}
                  </p>
                </div>
                {selectedNews.venue && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Venue</h4>
                    <p className="text-gray-900 font-medium">
                      {selectedNews.venue}
                    </p>
                  </div>
                )}
                {(selectedNews.startTime || selectedNews.endTime) && (
                  <div className="col-span-2">
                    <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wider">Time</h4>
                    <p className="text-gray-900 font-medium">
                      {selectedNews.startTime || "-"} {selectedNews.endTime ? `to ${selectedNews.endTime}` : ""}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6 border-l-4 border-[#0A1629] pl-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Description</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {selectedNews.description || "No description provided."}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedNews(null)}
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

export default News;