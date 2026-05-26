import React from 'react';
import { Building2, UserCog, Users, GraduationCap } from 'lucide-react';

const statsData = [
  {
    title: "Total Schools",
    count: 3,
    icon: Building2,
    bgClass: "bg-[#eef7ff]",
    iconClass: "text-[#0066b2]"
  },
  {
    title: "Total Admins",
    count: 3,
    icon: UserCog,
    bgClass: "bg-[#efefff]",
    iconClass: "text-[#5a4fcf]"
  },
  {
    title: "Total Users",
    count: 10,
    icon: Users,
    bgClass: "bg-[#fef5db]",
    iconClass: "text-[#c47c16]"
  },
  {
    title: "Teachers",
    count: 3,
    icon: GraduationCap,
    bgClass: "bg-[#fdeeee]",
    iconClass: "text-[#c72944]"
  }
];

const schoolDetails = [
  { school: "Green Valley Public School", city: "Delhi", board: "CBSE", admin: "Meera Sharma" },
  { school: "Sunrise International Academy", city: "Jaipur", board: "ICSE", admin: "Arjun Kapoor" },
  { school: "Riverdale Senior School", city: "Lucknow", board: "State", admin: "Priya Menon" }
];

const recentAdmins = [
  { admin: "Meera Sharma", email: "meera@greenvalley.edu", phone: "9876501001", school: "Green Valley Public School" },
  { admin: "Arjun Kapoor", email: "arjun@sunrise.edu", phone: "9876501002", school: "Sunrise International Academy" },
  { admin: "Priya Menon", email: "priya@riverdale.edu", phone: "9876501003", school: "Riverdale Senior School" }
];

const Dashboard = () => {
  return (
    <div className="mb-8 font-sans">
      <div className="mb-8">
        <h3 className='text-3xl font-bold mb-1 text-[#0B132B]'>Welcome to the Dashboard</h3>
        <p className='text-sm text-gray-500 font-medium'>Super Admin Panel</p>
      </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-5">
                        <div className={`w-[68px] h-[68px] rounded-[18px] ${stat.bgClass} flex items-center justify-center shrink-0`}>
                            <Icon size={32} className={stat.iconClass} strokeWidth={2} />
                        </div>
                        <div>
                            <h2 className="text-[#6b7280] font-medium text-[15px] mb-1">
                                {stat.title}
                            </h2>
                            <p className="text-[#0B132B] font-bold text-[32px] leading-none">
                                {stat.count}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Table - School Details */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50">
                <div className="flex items-center gap-3 mb-6">
                    <Building2 size={24} className="text-[#0B132B]" strokeWidth={2} />
                    <h2 className="text-xl font-bold text-[#0B132B]">School Details</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f8f9fc] text-[#6b7280]">
                            <tr>
                                <th className="px-4 py-3 font-semibold rounded-l-lg">School</th>
                                <th className="px-4 py-3 font-semibold">City</th>
                                <th className="px-4 py-3 font-semibold">Board</th>
                                <th className="px-4 py-3 font-semibold rounded-r-lg">Admin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[#374151]">
                            {schoolDetails.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-4 pr-8">{item.school}</td>
                                    <td className="px-4 py-4">{item.city}</td>
                                    <td className="px-4 py-4">{item.board}</td>
                                    <td className="px-4 py-4">{item.admin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Table - Recent Admins */}
            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50">
                <div className="flex items-center gap-3 mb-6">
                    <UserCog size={24} className="text-[#0B132B]" strokeWidth={2} />
                    <h2 className="text-xl font-bold text-[#0B132B]">Recent Admins</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f8f9fc] text-[#6b7280]">
                            <tr>
                                <th className="px-4 py-3 font-semibold rounded-l-lg">Admin</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Phone</th>
                                <th className="px-4 py-3 font-semibold rounded-r-lg">School</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[#374151]">
                            {recentAdmins.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-4 whitespace-nowrap">{item.admin}</td>
                                    <td className="px-4 py-4">{item.email}</td>
                                    <td className="px-4 py-4">{item.phone}</td>
                                    <td className="px-4 py-4 pr-8">{item.school}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Dashboard;
