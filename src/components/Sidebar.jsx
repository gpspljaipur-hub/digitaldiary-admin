import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Building2, UserCog, Users, Library, 
  BookOpen, Bell, AlertCircle, CalendarOff, GraduationCap, 
  BookText, Award, UserCheck, CalendarClock, FileEdit, 
  Calendar, Menu
} from "lucide-react";
const Sidebar = ({ isOpen = true }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split("/").pop();

  const role = localStorage.getItem("role");

  const superAdminMenu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "school-management", label: "Schools", icon: Building2 },
    { id: "admin", label: "Admin", icon: UserCog },
  ];

  const schoolAdminMenu = [
    { id: "home", label: "Dashboard", icon: LayoutDashboard },
    { id: "class", label: "Classes", icon: Library },
    { id: "subject", label: "Subject", icon: BookOpen },
    { id: "teacher", label: "Teacher", icon: Users },
    { id: "time-table", label: "Time Table", icon: Calendar},
    { id: "notice", label: "Notices", icon: Bell },
    { id: "complaint", label: "Complaint", icon: AlertCircle },
    { id: "leave", label: "Leave", icon: CalendarOff },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "homework", label: "Homework", icon: BookText },
    { id: "marks", label: "Marks", icon: Award },
    { id: "attendance", label: "Attendance", icon: UserCheck },
    { id: "teacher-schedule", label: "Teacher Schedule", icon: CalendarClock },
    { id: "exam-type", label: "Exam Schedule", icon: FileEdit },
  ];

  const menuItems =
    role === "super_admin"
      ? superAdminMenu
      : schoolAdminMenu;

  return (
    <div className={`h-screen sticky top-0 flex-shrink-0 bg-[#0b1c30] text-white transition-all duration-300 ${isOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
      <div className="w-72 h-full flex flex-col overflow-y-auto overflow-x-hidden">

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

          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(`/${item.id}`)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-300 hover:bg-[#112443] hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
              {item.label}
            </button>
          );
        })}

      </div>

      </div>
    </div>
  );
};

export default Sidebar;