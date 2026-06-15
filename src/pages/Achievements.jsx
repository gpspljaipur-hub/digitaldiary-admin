import React, { useState } from "react";
import { Plus, X, Eye, Paperclip } from "lucide-react";
import Select from "react-select";
import Pagination from "../components/Pagination";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetStudentQuery } from "../redux/services/studentApi";
import { useGetAchievementsQuery, useAddAchievementsMutation } from "../redux/services/achievementsApi";
import { BASE_URL } from "../redux/services/api";

const getFileUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  return `${BASE_URL}/${filePath.replace(/^\/?uploads\/uploads\//, "uploads/").replace(/^\//, "")}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("en-GB");
};

const StudentSelect = ({
  classId,
  selectedStudents,
  onChange,
  schoolId,
}) => {
  const { data } = useGetStudentQuery(
    { classId, schoolId },
    { skip: !classId }
  );

  const students = Array.isArray(data)
    ? data
    : data?.data || [];

  const options = students.map((s) => ({
    value: s._id || s.id,
    label:
      s.name ||
      `${s.firstName || ""} ${s.lastName || ""}`,
  }));

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((o) =>
        selectedStudents.includes(o.value)
      )}
      onChange={(selected) =>
        onChange(
          selected
            ? selected.map((s) => s.value)
            : []
        )
      }
      placeholder="Select Students"
    />
  );
};

const Achievements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    achievementDate: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [classSections, setClassSections] = useState([
    {
      classId: "",
      studentIds: [],
    },
  ]);

  const { data: achievementsData } = useGetAchievementsQuery({ schoolId });
  const [addAchievements, { isLoading }] = useAddAchievementsMutation();
  const { data: classes = [] } = useGetClassesQuery(schoolId);
  
  const classList = Array.isArray(classes) ? classes : classes?.data || [];
  const classOptions = classList.map((c) => ({
    value: c._id || c.id,
    label: c.name || c.className,
  }));

  const addClassSection = () => {
  setClassSections((prev) => [
    ...prev,
    {
      classId: "",
      studentIds: [],
    },
  ]);
};

const removeClassSection = (index) => {
  setClassSections((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

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
   
    const formattedDate = formData.achievementDate
      ? formData.achievementDate.split("-").reverse().join("-")
      : "";
    payload.append("achievementDate", formattedDate);
    payload.append("category", formData.category);
    const classIds = classSections
  .map((item) => item.classId)
  .filter(Boolean);

const studentIds = [
  ...new Set(
    classSections.flatMap(
      (item) => item.studentIds
    )
  ),
];

payload.append(
  "classIds",
  JSON.stringify(classIds)
);

payload.append(
  "studentIds",
  JSON.stringify(studentIds)
);

    if (imageFile) {
      payload.append("image", imageFile);
    }

    try {
      await addAchievements(payload).unwrap();
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        achievementDate: "",
        category: "",
      });
      setClassSections([
        {
          classId: "",
          studentIds: [],
        },
      ]);
 
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add achievement:", error);
      alert("Failed to add achievement.");
    }
  };

  const achievements = Array.isArray(achievementsData) ? achievementsData : (achievementsData?.data || []);

  const totalPages = Math.max(1, Math.ceil(achievements.length / itemsPerPage));
  const currentAchievements = achievements.slice( (currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Achievements
          </h2>
          <p className="text-gray-500 text-sm">
            View student and class achievements
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Achievement
          </button>
        </div>
      </div>

      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0B132B]">All Achievements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">Title</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Category</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Classes</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Students</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Description</th>
                <th className="px-6 py-4 font-semibold tracking-wide text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentAchievements.length > 0 ? (
                currentAchievements.map((achievement, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {achievement.title || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {achievement.category || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(achievement.achievementDate)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={achievement.classIds?.map((c) => c.name).join(", ")}>
                      {achievement.classIds?.map((c) => c.name).join(", ") || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[200px] truncate" title={achievement.studentIds?.map((s) => s.name).join(", ")}>
                      {achievement.studentIds?.map((s) => s.name).join(", ") || "-"}
                    </td>
                    <td
                      className="px-6 py-4 text-gray-600 max-w-[200px] truncate"
                      title={achievement.description}
                    >
                      {achievement.description || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedAchievement(achievement)}
                          className="flex items-center gap-1.5 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shadow-sm"
                        >
                          <Eye size={14} />
                          More Info
                        </button>
                        {achievement.image && (
                          <button
                            onClick={() => window.open(getFileUrl(achievement.image), "_blank")}
                            className="flex items-center gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 px-3 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap shadow-sm"
                          >
                            <Paperclip size={14} />
                            View Attachment
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No Achievements Found
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
                Add Achievement
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
                    placeholder="e.g. Science Exhibition Winners"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Science"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Achievement Date</label>
                  <input
                    type="date"
                    name="achievementDate"
                    value={formData.achievementDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
  <label className="block text-sm font-semibold text-gray-700 mb-3">
    Classes & Students
  </label>

  {classSections.map((section, index) => (
    <div
      key={index}
      className="border rounded-xl p-4 mb-4"
    >
      <div className="flex justify-between mb-3">
        <h4 className="font-medium">
          Class {index + 1}
        </h4>

        {classSections.length > 1 && (
          <button
            type="button"
            onClick={() =>
              removeClassSection(index)
            }
            className="text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      <Select
        options={classOptions}
        value={
          classOptions.find(
            (c) => c.value === section.classId
          ) || null
        }
        onChange={(selected) => {
          const updated = [...classSections];

          updated[index] = {
            classId: selected?.value || "",
            studentIds: [],
          };

          setClassSections(updated);
        }}
        placeholder="Select Class"
      />

      <div className="mt-3">
        <StudentSelect
          classId={section.classId}
          selectedStudents={section.studentIds}
          schoolId={schoolId}
          onChange={(students) => {
            const updated = [...classSections];

            updated[index].studentIds =
              students;

            setClassSections(updated);
          }}
        />
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addClassSection}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
  >
    + Add Class
  </button>
</div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="e.g. Students won prizes in inter-school science exhibition."
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
                        src={
                          typeof imageFile === "string"
                            ? imageFile.startsWith("http")
                              ? imageFile
                              : `https://digitaldiry-backend.onrender.com/${
                                  imageFile
                                    .replace(/^\/?uploads\/uploads\//, "uploads/")
                                    .replace(/^\//, "")
                                }`
                            : URL.createObjectURL(imageFile)
                        }
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

      {selectedAchievement && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[24px] relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-[#0B132B]">
                  {selectedAchievement.title || "Achievement"}
                </h2>
                {selectedAchievement.category && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {selectedAchievement.category}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">

              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Date</h4>
                <p className="text-gray-900 font-medium">
                  {formatDate(selectedAchievement.achievementDate)}
                </p>
              </div>

              <div className="mb-6 border-l-4 border-[#0A1629] pl-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Description</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                  {selectedAchievement.description || "No description provided."}
                </p>
              </div>

              {selectedAchievement.classIds && selectedAchievement.classIds.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.classIds.map((cls, idx) => (
                      <div
                        key={idx}
                        className="bg-[#eef7ff] text-[#0066b2] text-xs font-semibold px-4 py-2 rounded-xl"
                      >
                        {cls.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAchievement.studentIds && selectedAchievement.studentIds.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Students</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAchievement.studentIds.map((student, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl"
                      >
                        {student.name || `${student.firstName || ""} ${student.lastName || ""}`.trim()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAchievement.image && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Attachments</h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => window.open(getFileUrl(selectedAchievement.image), "_blank")}
                      className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      <Paperclip size={16} />
                      View Attachment
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[24px] flex justify-end">
                <button
                    onClick={() => setSelectedAchievement(null)}
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

export default Achievements;