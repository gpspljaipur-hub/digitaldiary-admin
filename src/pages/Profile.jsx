import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  CalendarDays,
  BadgeCheck,
  School,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const savedData = localStorage.getItem("adminData");
  const profile = savedData ? JSON.parse(savedData) : {};
  const role = localStorage.getItem("role") || "";

  const profileFields = [
    {
      label: "School Name",
      value: profile.schoolId?.name,
      icon: School,
      span: true,
    },
    {
      label: "First Name",
      value: profile.firstName,
      icon: User,
    },
    {
      label: "Last Name",
      value: profile.lastName,
      icon: User,
    },
    {
      label: "Employee ID",
      value: profile.employeeId,
      icon: BadgeCheck,
    },
    {
      label: "Date of Birth",
      value: profile.dob ? new Date(profile.dob).toLocaleDateString() : "",
      icon: CalendarDays,
    },
    {
      label: "Phone Number",
      value: profile.mobile,
      icon: Phone,
    },
    {
      label: "Email",
      value: profile.email,
      icon: Mail,
    },
    {
      label: "Joined At",
      value: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "",
      icon: CalendarDays,
      span: true,
    },
  ];

  const handleBack = () => {
    const role = localStorage.getItem("role");
    navigate(role === "super_admin" ? "/dashboard" : "/home");
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="bg-[#0A1629] text-white py-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <User size={28} />
          </div>

          <h1 className="text-2xl font-bold">
            {profile.firstName || "N/A"} {profile.lastName || ""}
          </h1>

          <p className="text-sm text-gray-300 uppercase tracking-wider mt-1 font-medium">
            {role ? role.replace(/_/g, ' ') : "Administrator Profile"}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileFields.map(
              ({ label, value, icon: Icon, span }) => (
                <div
                  key={label}
                  className={`p-4 bg-gray-50 rounded-xl flex gap-3 items-center ${
                    span ? "md:col-span-2" : ""
                  }`}
                >
                  <Icon size={20} />

                  <div>
                    <p className="text-xs text-gray-500">
                      {label}
                    </p>

                    <p className="font-semibold">
                      {value || "Not Set"}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <button
            onClick={handleBack}
            className="w-full mt-6 py-3 border rounded-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;