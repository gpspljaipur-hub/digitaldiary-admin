import React, { useState, useEffect } from "react";

const Homework = () => {
  const [homeworkList, setHomeworkList] = useState(() => {
    const saved = localStorage.getItem("homework_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse homework from localStorage");
      }
    }
    // Default dummy data simulating API response
    return [
      {
        className: "10th A",
        subjectName: "Mathematics",
        date: "2026-05-14",
        homework: "Complete exercises 4.1 and 4.2 from the NCERT textbook."
      },
      {
        className: "9th B",
        subjectName: "Science",
        date: "2026-05-14",
        homework: "Draw the diagram of human digestive system and label its parts."
      },
      {
        className: "8th A",
        subjectName: "English",
        date: "2026-05-13",
        homework: "Write an essay on 'My Favorite Festival' in 200 words."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("homework_data", JSON.stringify(homeworkList));
  }, [homeworkList]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Homework List
        </h2>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Class Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Homework
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {homeworkList.length > 0 ? (
                homeworkList.map((hw, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {hw.className || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {hw.subjectName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {hw.date || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={hw.homework}>
                      {hw.homework || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No Homework Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Homework;
