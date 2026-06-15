import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { useGetBannersQuery, useAddBannerMutation } from '../redux/services/bannerApi';
import { BASE_URL } from '../redux/services/api';

const Banner = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [files, setFiles] = useState([]);

  const schoolId = localStorage.getItem("schoolId");

  const { data: response, isLoading } = useGetBannersQuery({ schoolId }, { skip: !schoolId });
  const banners = response?.data || [];
  const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolId) {
      alert("School ID not found!");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("schoolId", schoolId);
      payload.append("title", formData.title);
      
      files.forEach((file) => {
        payload.append("images", file);
      });

      await addBanner(payload).unwrap();
      alert("Banner added successfully!");
      setFormData({ title: "" });
      setFiles([]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Failed to add banner.");
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${BASE_URL}/${path.replace(/^\/?uploads\/uploads\//, "uploads/").replace(/^\//, "")}`;
  };

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">School Banners</h2>
          <p className="text-gray-500 text-sm">Manage banners displayed in the app</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} />
            Add Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-gray-500 font-medium">Loading banners...</div>
        ) : banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={banner._id || index} className="bg-white rounded-[20px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-gray-50">
                <h3 className="text-xl font-bold text-[#0B132B] truncate">{banner.title || "Untitled Banner"}</h3>
              </div>
              <div className="p-5 bg-gray-50/50 flex-grow">
                {banner.images && banner.images.length > 0 ? (
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x scroll-smooth">
                    {banner.images.map((image, imgIndex) => {
                      const fileUrl = getImageUrl(image);
                      return (
                        <a 
                          key={imgIndex} 
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 snap-start w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] block hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <img 
                            src={fileUrl} 
                            alt={`Banner Preview ${imgIndex + 1}`} 
                            className="w-full h-48 object-contain bg-white rounded-xl border border-gray-200 shadow-sm"
                          />
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 rounded-xl border border-gray-200 text-gray-400">
                    <ImageIcon size={32} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Images</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-[20px] border border-gray-50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No Banners Found</p>
            <p className="text-gray-400 text-sm mt-1">Click on "Add Banner" to upload one.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add New Banner</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter banner title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0A1629] file:text-white hover:file:bg-[#112443]"
                  required
                />
                <p className="text-xs text-gray-500 mt-2 font-medium">You can select multiple images by holding Ctrl/Cmd.</p>
              </div>

              {files.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Selected Previews</label>
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                    {files.map((file, index) => (
                      <div key={index} className="flex-shrink-0 snap-start w-40 h-24 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAdding ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;