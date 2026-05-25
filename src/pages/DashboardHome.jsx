import React from 'react'
import { BookOpen, GraduationCap, Megaphone, ClipboardCheck, CalendarCheck, CalendarDays } from 'lucide-react'

const statsData = [
    {
        title: "Teachers",
        count: 3,
        icon: GraduationCap,
        bgClass: "bg-[#eef7ff]",
        iconClass: "text-[#0066b2]"
    },
    {
        title: "Classes",
        count: 3,
        icon: BookOpen,
        bgClass: "bg-[#efefff]",
        iconClass: "text-[#5a4fcf]"
    },
    {
        title: "Notices",
        count: 1,
        icon: Megaphone,
        bgClass: "bg-[#fef5db]",
        iconClass: "text-[#c47c16]"
    },
    {
        title: "Pending Leave",
        count: 1,
        icon: ClipboardCheck,
        bgClass: "bg-[#fdeeee]",
        iconClass: "text-[#c72944]"
    }
];

function DashboardHome() {
  return (
    <div className='mb-8'>
        <div className="mb-8">
            <h1 className='text-3xl font-bold mb-1 text-[#0B132B]'>Welcome to the Dashboard</h1>
            <p className='text-sm text-gray-500 font-medium'>SVVM School</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-5">
                        <div className={`w-[68px] h-[68px] rounded-[18px] ${stat.bgClass} flex items-center justify-center shrink-0`}>
                            <Icon size={32} className={stat.iconClass} strokeWidth={2} />
                        </div>
                        <div>
                            <h2 className='text-[#6b7280] font-medium text-[15px] mb-1'>
                                {stat.title}
                            </h2>
                            <p className='text-[#0B132B] font-bold text-[32px] leading-none'>
                                {stat.count}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
            
            {/* Teacher Schedule */}
            <div className='lg:col-span-2 bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50'>
                <div className="flex items-center gap-3 mb-6">
                    <CalendarDays size={24} className="text-[#0B132B]" strokeWidth={2} />
                    <h2 className='text-xl font-bold text-[#0B132B]'>Teacher Schedule</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f8f9fc] text-[#6b7280]">
                            <tr>
                                <th className="px-4 py-3 font-semibold rounded-l-lg">Teacher</th>
                                <th className="px-4 py-3 font-semibold">Class</th>
                                <th className="px-4 py-3 font-semibold">Subject</th>
                                <th className="px-4 py-3 font-semibold">Day</th>
                                <th className="px-4 py-3 font-semibold rounded-r-lg">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[#374151]">
                            <tr className="hover:bg-gray-50/50">
                                <td className="px-4 py-4">Rohan<br/>Mehta</td>
                                <td className="px-4 py-4">8A</td>
                                <td className="px-4 py-4">Mathematics</td>
                                <td className="px-4 py-4">Monday</td>
                                <td className="px-4 py-4">09:00<br/>AM</td>
                            </tr>
                            <tr className="hover:bg-gray-50/50">
                                <td className="px-4 py-4">Anita<br/>Rao</td>
                                <td className="px-4 py-4">7B</td>
                                <td className="px-4 py-4">Science</td>
                                <td className="px-4 py-4">Tuesday</td>
                                <td className="px-4 py-4">10:00<br/>AM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Latest Notices */}
            <div className='bg-white rounded-[20px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-50'>
                <div className="flex items-center gap-3 mb-6">
                    <Megaphone size={24} className="text-[#0B132B]" strokeWidth={2} />
                    <h2 className='text-xl font-bold text-[#0B132B]'>Latest Notices</h2>
                </div>
                
                <div className="bg-[#f8f9fc] rounded-r-xl border-l-[4px] border-[#6366f1] p-4">
                    <h3 className="font-bold text-[#0B132B] text-base mb-1">Unit test schedule</h3>
                    <p className="text-[#374151] text-sm mb-4">Unit tests will start next Monday.</p>
                    
                    <div className="flex gap-3">
                        <span className="bg-[#ccfbf1] text-[#0f766e] text-xs font-semibold px-3 py-1 rounded-full">
                            All Classes
                        </span>
                        <span className="bg-[#fef3c7] text-[#b45309] text-xs font-semibold px-3 py-1 rounded-full">
                            2026-05-22
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default DashboardHome