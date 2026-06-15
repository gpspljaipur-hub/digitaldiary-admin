import React, { useState} from "react";
import { Plus, X, Eye } from "lucide-react";
import Pagination from "../components/Pagination";
import { useGetExamTypeQuery, useAddExamTypeMutation } from "../redux/services/examTypeApi";
import { useGetClassesQuery } from "../redux/services/classApi";
import { useGetSubjectQuery } from "../redux/services/subjectApi";

const ExamType = () => {
  const [showExamForm, setShowExamForm] = useState(false);
  const [selectedExamDetails, setSelectedExamDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [examForm, setExamForm] = useState({
    examType: "",
    classId: "",
    subjectId: "",
    examDate: "",
    startTime: "",
    endTime: "",
    totalMarks: "",
    passingMarks: "",
    roomNo : "",
    instructions: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schoolId = localStorage.getItem("schoolId");
  const {data: classes = []} = useGetClassesQuery(schoolId);
  const {data: formSubjects = []} = useGetSubjectQuery({schoolId, classId: examForm.classId}, {skip: !examForm.classId});
  const {data: exam = []} = useGetExamTypeQuery({schoolId, classId: selectedClass});
  const [addExamType] = useAddExamTypeMutation();
  
  const handleExamChange = (e) => {
    setExamForm({
      ...examForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleExamSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...examForm,
        schoolId,
        totalMarks: Number(examForm.totalMarks),
        passingMarks: Number(examForm.passingMarks)
      };
      await addExamType(payload).unwrap();
      setExamForm({
        examType: "",
        classId: "",
        subjectId: "",
        examDate: "",
        startTime: "",
        endTime: "",
        totalMarks: "",
        passingMarks: "",
        roomNo : "",
        instructions: ""
      });
      setShowExamForm(false);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(exam.length / itemsPerPage));
  const currentExam = exam.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full h-full p-2 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
            Exam Schedule List
          </h2>
          <p className="text-gray-500 text-sm">
            Manage exam schedules and details
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-200 p-3 rounded-xl focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all min-w-[200px]"
          >
            <option value="" disabled>Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls._id || cls.id}>
                {cls.className || cls.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowExamForm(true)}
            className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            Add Exam Schedule
          </button>
        </div>
      </div>



      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50 w-full">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#0B132B]"> Exam Schedule </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide w-24">S.No</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Exam Type</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Class</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Subject</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Date</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Time</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Room</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {currentExam.length > 0 ? (
                currentExam.map((exm, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 font-medium">{exm.examType || exm.name}</td>
                    <td className="px-6 py-4 font-medium">{exm.classId.name || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{exm.subjectId.name || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{exm.examDate ? new Date(exm.examDate).toLocaleDateString() : "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{exm.startTime && exm.endTime ? `${exm.startTime} - ${exm.endTime}` : "N/A"}</td>
                    <td className="px-6 py-4 font-medium">{exm.roomNo || "N/A"}</td>
                    <td className="px-6 py-4 font-medium">
                      <button
                        onClick={() => setSelectedExamDetails(exm)}
                        className="text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 p-2 rounded-lg flex items-center justify-center"
                        title="More Info"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                    No Exam Found
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

      {showExamForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Add Exam Schedule</h2>
              <button
                type="button"
                onClick={() => setShowExamForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleExamSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Exam Type</label>
                  <input
                    type="text"
                    name="examType"
                    placeholder="e.g. Mid Term"
                    value={examForm.examType}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class</label>
                  <select
                    name="classId"
                    value={examForm.classId}
                    onChange={(e) => {
                      handleExamChange(e);
                      setExamForm(prev => ({ ...prev, subjectId: "" }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
                    required
                  >
                    <option value="" disabled>Select Class</option>
                    {classes.map((cls, idx) => (
                      <option key={idx} value={cls._id || cls.id}>{cls.className || cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                  <select
                    name="subjectId"
                    value={examForm.subjectId}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all bg-white"
                    required
                    disabled={!examForm.classId}
                  >
                    <option value="" disabled>Select Subject</option>
                    {formSubjects.map((sub, idx) => (
                      <option key={idx} value={sub._id || sub.id}>{sub.name || sub.subjectName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Exam Date</label>
                  <input
                    type="date"
                    name="examDate"
                    value={examForm.examDate}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={examForm.startTime}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={examForm.endTime}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Total Marks</label>
                  <input
                    type="number"
                    name="totalMarks"
                    placeholder="e.g. 100"
                    value={examForm.totalMarks}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Passing Marks</label>
                  <input
                    type="number"
                    name="passingMarks"
                    placeholder="e.g. 33"
                    value={examForm.passingMarks}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Room No</label>
                  <input
                    type="text"
                    name="roomNo"
                    placeholder="e.g. A-101"
                    value={examForm.roomNo}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Instructions</label>
                  <textarea
                    name="instructions"
                    placeholder="e.g. Bring admit card and pen"
                    value={examForm.instructions}
                    onChange={handleExamChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                    rows="3"
                  />
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100 flex items-center justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={() => setShowExamForm(false)}
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

      {selectedExamDetails && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-[24px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0B132B]">Exam Details</h2>
              <button
                type="button"
                onClick={() => setSelectedExamDetails(null)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Exam Type</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.examType || selectedExamDetails.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                  {selectedExamDetails.status ? (
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 uppercase tracking-wide">
                      {selectedExamDetails.status}
                    </span>
                  ) : (
                    <p className="text-base font-semibold text-gray-900">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Class</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.classId?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Subject</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.subjectId?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.examDate ? new Date(selectedExamDetails.examDate).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Time</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.startTime && selectedExamDetails.endTime ? `${selectedExamDetails.startTime} - ${selectedExamDetails.endTime}` : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Marks</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.totalMarks || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Passing Marks</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.passingMarks || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Room No.</p>
                  <p className="text-base font-semibold text-gray-900">{selectedExamDetails.roomNo || "N/A"}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 font-medium">Instructions</p>
                  <div className="mt-1 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm whitespace-pre-line font-semibold">
                    {selectedExamDetails.instructions || "No instructions provided."}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedExamDetails(null)}
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

export default ExamType;
