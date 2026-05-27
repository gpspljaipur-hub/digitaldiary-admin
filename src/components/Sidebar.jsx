import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split("/").pop();

  const role = localStorage.getItem("role");

  const superAdminMenu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "school-management", label: "Schools" },
    { id: "admin", label: "Admin" },
  ];

  const schoolAdminMenu = [
    { id: "home", label: "Dashboard" },
    { id: "teacher", label: "Teacher" },
    { id: "class", label: "Classes" },
    { id: "subject", label: "Subject" },
    { id: "notice", label: "Notices" },
    { id: "complaint", label: "Complaint" },
    { id: "leave", label: "Leave" },
    { id: "student", label: "Student" },
    { id: "homework", label: "Homework" },
    { id: "marks", label: "Marks" },
    { id: "attendance", label: "Attendance" },
    { id: "teacher-schedule", label: "Teacher Schedule" },
    { id: "exam-type", label: "Exam Type" },


  ];

  const menuItems =
    role === "super_admin"
      ? superAdminMenu
      : schoolAdminMenu;

  return (
    <div className="w-72 h-screen sticky top-0 flex-shrink-0 bg-[#0b1c30] text-white flex flex-col overflow-auto">

      <div className="p-6 flex items-center gap-4">

        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold leading-none">
            DSDS Portal
          </h1>

          <p className="text-xs tracking-[4px] text-gray-300 mt-2 font-semibold uppercase">
            {role === "super_admin"
              ? "Super Admin"
              : "School Admin"}
          </p>
        </div>

      </div>

      <div className="flex flex-col gap-2 p-4 mt-2">

        {menuItems.map((item) => {

          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigate(`/${item.id}`)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-[#112443] hover:text-white"
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