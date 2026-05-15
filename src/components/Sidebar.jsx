import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab = tab || "teacher";

  const menuItems = [
    { id: "teacher", label: "Teacher" },
    { id: "class", label: "Class"},
    { id: "subject", label: "Subject"},
    { id: "notice", label: "Notice" },
    { id: "complaint", label: "Complaint" },
    { id: "leave", label: "Leave" },
    { id: "homework", label: "Homework" },
    { id: "marks", label: "Marks"},
    { id: "attendance", label: "Attendance"},
    { id: "teacher- schedule", label: "Teacher Schedule"},
    { id: "student", label: "Student"},
    { id: "exam-type", label: "Exam Type"}

  ];

  return (
    <div className="w-64 h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm text-gray-800 flex flex-col overflow-auto">

      <div className="flex flex-col gap-2 p-4 mt-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(`/dashboard/${item.id}`)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;