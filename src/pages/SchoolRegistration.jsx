import React from 'react'
import { Building2, MapPin, Phone, BookOpen, AlertTriangle, BadgeCheck } from 'lucide-react'

function SchoolRegistration() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#f8f9fc] -m-10 w-[calc(100%+5rem)] max-w-none">
            
            {/* Left Column (Main Form) */}
            <div className="flex-1 px-6 lg:px-10 pb-10 pt-4 max-w-5xl mx-auto w-full">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-[32px] font-bold text-[#0A1629] mb-2">
                        New School Registration
                    </h2>
                    <p className="text-gray-600 text-[15px]">
                        Enter formal school registration details to initialize an official profile in the DSDS registry.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* School Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#0A1629] rounded-lg flex items-center justify-center text-white">
                                <Building2 size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1629]">
                                School Information
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                   Full School Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="schoolName"
                                    placeholder="e.g. Government Senior Secondary Model School"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    UDISE Code <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="udiseCode"
                                        placeholder="11-digit UDISE Code"
                                        className="w-full border border-gray-300 pl-4 pr-10 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <BadgeCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    School Type
                                </label>
                                <select
                                    name="schoolType"
                                    defaultValue="secondary"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white appearance-none"
                                >
                                    <option value="primary">Primary</option>
                                    <option value="upper_primary">Upper Primary</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="high_secondary">High Secondary</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Board Affiliation
                                </label>
                                <select
                                    name="boardAffiliation"
                                    defaultValue="icse"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white appearance-none"
                                >
                                    <option value="cbse">CBSE</option>
                                    <option value="icse">ICSE</option>
                                    <option value="state">State Board</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#0A1629] rounded-lg flex items-center justify-center text-white">
                                <MapPin size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1629]">
                                Location Information
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    defaultValue="Punjab"
                                    readOnly
                                    className="w-full border border-blue-200 bg-blue-50 px-4 py-3 rounded-lg focus:outline-none text-sm text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    District <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="district"
                                    defaultValue="amritsar"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm bg-white appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select district</option>
                                    <option value="amritsar">Amritsar</option>
                                    <option value="ludhiana">Ludhiana</option>
                                    <option value="jalandhar">Jalandhar</option>
                                    <option value="patiala">Patiala</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Block <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="block"
                                    placeholder="Enter Block name"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Pin Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="pinCode"
                                    placeholder="Enter Pin Code"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Detailed Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="address"
                                    placeholder="Enter full address"
                                    rows="3"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y text-sm"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#0A1629] rounded-lg flex items-center justify-center text-white">
                                <Phone size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1629]">
                                Contact Information
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Principal Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="principalName"
                                    placeholder="Enter principal's full name"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Principal Mobile Number <span className="text-red-500">*</span> 
                                </label>
                                <input
                                    type="tel"
                                    name="principalMobile"
                                    maxLength={10}
                                    placeholder="Enter principal's mobile number"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />  
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Principal Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="principalEmail"
                                    placeholder="Enter principal's email address"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#0A1629] rounded-lg flex items-center justify-center text-white">
                                <BookOpen size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#0A1629]">
                                Academic Details
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Total Student Enrollment <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="totalStudents"
                                    placeholder="Enter total number of students"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                                    Total Teaching Staff <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="teachingStaff"
                                    placeholder="Enter total number of teaching staff"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center gap-4 pt-4 pb-10">
                        <button
                            type="submit"
                            className="bg-[#0A1629] hover:bg-[#0A1629]/90 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                        >
                            Save School Profile
                        </button>
                        <button
                            type="reset"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                </form>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:w-[380px] bg-white border-l border-gray-200 px-6 lg:px-8 pb-8 pt-4 shrink-0">
                <div className="sticky top-4 flex flex-col gap-6">
                
                {/* Form Progress Card */}
                <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-6">
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">Form Progress</h4>
                    
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">School Info</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">In Progress</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Location Details</p>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mt-0.5">Pending</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Contact Profile</p>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mt-0.5">Pending</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
                            <div>
                                <p className="text-sm font-medium text-gray-400">Academic Scope</p>
                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider mt-0.5">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Validation Status Card */}
                <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                    <div className="flex items-center gap-2 text-red-700 mb-3">
                        <AlertTriangle size={18} />
                        <h4 className="text-sm font-bold">Validation Status</h4>
                    </div>
                    <p className="text-xs text-red-700/80 mb-4 font-medium leading-relaxed">
                        The following mandatory fields are currently empty or invalid:
                    </p>
                    <ul className="list-disc pl-4 text-xs font-medium text-red-700 space-y-2">
                        <li>UDISE Code (Incomplete)</li>
                        <li>District Selection</li>
                        <li>Principal Mobile Number</li>
                    </ul>
                </div>

                {/* Submission Guidelines Card */}
                <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h4 className="text-sm font-bold text-[#0A1629]">Submission Guidelines</h4>
                    </div>
                    <div className="p-3">
                        <div className="relative rounded-lg overflow-hidden h-28 bg-gray-900">
                            {/* Placeholder for the building image with overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Building" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <p className="absolute bottom-3 left-3 right-3 text-[10px] text-white font-medium z-20 leading-tight">
                                DSDS Portal ensures 100% accurate institutional mapping across all 22 districts of Punjab.
                            </p>
                        </div>
                    </div>
                </div>

                </div>
            </div>

        </div>
    )
}

export default SchoolRegistration







































// import '../styles.css'
// import React, { useMemo, useState } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   Bell,
//   BookOpen,
//   Building2,
//   CalendarDays,
//   CheckCircle2,
//   ClipboardCheck,
//   GraduationCap,
//   LayoutDashboard,
//   LogOut,
//   Megaphone,
//   Plus,
//   School,
//   Search,
//   ShieldCheck,
//   UserCog,
//   Users,
//   XCircle
// } from "lucide-react";


// const today = "2026-05-22";
// const storageKey = "react-school-admin-suite-v1";

// const seedData = {
//   superAdmin: {
//     id: "sal",
//     name: "Aditi Rao",
//     email: "super@edusuite.com",
//     role: "Super Admin"
//   },
//   schools: [
//     { id: "sch1", name: "Green Valley Public School", city: "Delhi", board: "CBSE", adminId: "a1" },
//     { id: "sch2", name: "Sunrise International Academy", city: "Jaipur", board: "ICSE", adminId: "a2" },
//     { id: "sch3", name: "Riverdale Senior School", city: "Lucknow", board: "State", adminId: "a3" }
//   ],
//   admins: [
//     { id: "a1", name: "Meera Sharma", email: "meera@greenvalley.edu", phone: "9876501001", schoolId: "sch1" },
//     { id: "a2", name: "Arjun Kapoor", email: "arjun@sunrise.edu", phone: "9876501002", schoolId: "sch2" },
//     { id: "a3", name: "Priya Menon", email: "priya@riverdale.edu", phone: "9876501003", schoolId: "sch3" }
//   ],
//   teachers: [
//     { id: "t1", name: "Rohan Mehta", email: "rohan@greenvalley.edu", subject: "Mathematics", className: "8A", schoolId: "sch1" },
//     { id: "t2", name: "Anita Rao", email: "anita@greenvalley.edu", subject: "Science", className: "7B", schoolId: "sch1" },
//     { id: "t3", name: "Farhan Ali", email: "farhan@greenvalley.edu", subject: "English", className: "6A", schoolId: "sch1" }
//   ],
//   students: [
//     { id: "s1", name: "Aarav Gupta", parent: "Neha Gupta", className: "8A", schoolId: "sch1" },
//     { id: "s2", name: "Isha Verma", parent: "Karan Verma", className: "8A", schoolId: "sch1" },
//     { id: "s3", name: "Diya Kapoor", parent: "Amit Kapoor", className: "7B", schoolId: "sch1" },
//     { id: "s4", name: "Kabir Singh", parent: "Pooja Singh", className: "6A", schoolId: "sch1" }
//   ],
//   subjects: [
//     { id: "sub1", name: "Mathematics", className: "8A", schoolId: "sch1" },
//     { id: "sub2", name: "Science", className: "7B", schoolId: "sch1" },
//     { id: "sub3", name: "English", className: "6A", schoolId: "sch1" }
//   ],
//   notices: [
//     { id: "n1", title: "Unit test schedule", audience: "All Classes", body: "Unit tests will start next Monday.", date: today, schoolId: "sch1" }
//   ],
//   leaves: [
//     { id: "l1", student: "Aarav Gupta", className: "8A", reason: "Medical appointment", from: "2026-05-24", to: "2026-05-25", status: "Pending", schoolId: "sch1" },
//     { id: "l2", student: "Diya Kapoor", className: "7B", reason: "Family function", from: "2026-05-27", to: "2026-05-27", status: "Approved", schoolId: "sch1" }
//   ],
//   complaints: [
//     { id: "c1", student: "Kabir Singh", className: "6A", issue: "Homework not submitted twice.", status: "Open", schoolId: "sch1" }
//   ],
//   homework: [
//     { id: "h1", title: "Algebra worksheet", className: "8A", subject: "Mathematics", due: "2026-05-29", teacher: "Rohan Mehta", schoolId: "sch1" },
//     { id: "h2", title: "Plant cell diagram", className: "7B", subject: "Science", due: "2026-05-30", teacher: "Anita Rao", schoolId: "sch1" }
//   ],
//   schedules: [
//     { id: "sc1", teacherId: "t1", className: "8A", subject: "Mathematics", day: "Monday", time: "09:00 AM", schoolId: "sch1" },
//     { id: "sc2", teacherId: "t2", className: "7B", subject: "Science", day: "Tuesday", time: "10:00 AM", schoolId: "sch1" }
//   ]
// };

// function loadState() {
//   const saved = localStorage.getItem(storageKey);
//   if (!saved) return seedData;
//   try {
//     return { ...seedData, ...JSON.parse(saved) };
//   } catch {
//     return seedData;
//   }
// }

// function uid(prefix) {
//   return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 999)}`;
// }

// function Badge({ tone = "green", children }) {
//   return <span className={`badge ${tone}`}>{children}</span>;
// }

// function StatCard({ icon: Icon, label, value, tone }) {
//   return (
//     <article className="stat-card">
//       <span className={`stat-icon ${tone}`}><Icon size={21} /></span>
//       <div>
//         <p>{label}</p>
//         <strong>{value}</strong>
//       </div>
//     </article>
//   );
// }

// function EmptyState({ children }) {
//   return <p className="empty">{children}</p>;
// }

// export default function App() {
//   const [data, setData] = useState(loadState);
//   const [session, setSession] = useState(null);
//   const [view, setView] = useState("dashboard");
//   const [query, setQuery] = useState("");

//   function commit(next) {
//     setData(next);
//     localStorage.setItem(storageKey, JSON.stringify(next));
//   }

//   const currentAdmin = useMemo(() => {
//     if (!session || session.role !== "admin") return null;
//     return data.admins.find((admin) => admin.id === session.userId);
//   }, [data.admins, session]);

//   const currentSchool = useMemo(() => {
//     if (!currentAdmin) return null;
//     return data.schools.find((school) => school.id === currentAdmin.schoolId);
//   }, [currentAdmin, data.schools]);

//   const schoolScoped = (items) => {
//     if (!currentAdmin) return items;
//     return items.filter((item) => item.schoolId === currentAdmin.schoolId);
//   };

//   const classes = useMemo(() => {
//     const studentClasses = schoolScoped(data.students).map((item) => item.className);
//     const subjectClasses = schoolScoped(data.subjects).map((item) => item.className);
//     return [...new Set(studentClasses.concat(subjectClasses))].sort();
//   }, [data.students, data.subjects, currentAdmin]);

//   const subjects = schoolScoped(data.subjects);
//   const teachers = schoolScoped(data.teachers);
//   const notices = schoolScoped(data.notices);
//   const leaves = schoolScoped(data.leaves);
//   const complaints = schoolScoped(data.complaints);
//   const homework = schoolScoped(data.homework);
//   const schedules = schoolScoped(data.schedules);

//   if (!session) {
//     return <Login data={data} onLogin={(nextSession) => {
//       setSession(nextSession);
//       setView("dashboard");
//     }} />;
//   }

//   const roleLabel = session.role === "super" ? "Super Admin" : "Admin";
//   const displayName = session.role === "super" ? data.superAdmin.name : currentAdmin?.name;
//   const subtitle = session.role === "super" ? "Platform Control" : currentSchool?.name;

//   const nav = session.role === "super"
//     ? [
//         ["dashboard", "Dashboard", LayoutDashboard],
//         ["admins", "Admins", UserCog],
//         ["schools", "Schools", School],
//         ["users", "Users", Users]
//       ]
//     : [
//         ["dashboard", "Dashboard", LayoutDashboard],
//         ["teachers", "Teachers", GraduationCap],
//         ["classes", "Classes", BookOpen],
//         ["notices", "Notices", Megaphone],
//         ["leave", "Leave", ClipboardCheck],
//         ["complaints", "Complaints", Bell],
//         ["homework", "Homework", BookOpen],
//         ["schedule", "Schedule", CalendarDays]
//       ];

//   return (
//     <div className="app">
//       <aside className="sidebar">
//         <div className="brand">
//           <div className="brand-mark"><ShieldCheck size={24} /></div>
//           <div>
//             <strong>EduSuite</strong>
//             <span>{roleLabel}</span>
//           </div>
//         </div>
//         <nav>
//           {nav.map(([id, label, Icon]) => (
//             <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>
//               <Icon size={19} />
//               {label}
//             </button>
//           ))}
//         </nav>
//         <button className="logout" onClick={() => setSession(null)}>
//           <LogOut size={18} /> Sign out
//         </button>
//       </aside>

//       <main className="main">
//         <header className="topbar">
//           <div>
//             <p className="eyebrow">{roleLabel} panel</p>
//             <h1>{viewTitle(view)}</h1>
//             <span>{subtitle}</span>
//           </div>
//           <div className="search">
//             <Search size={18} />
//             <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search details..." />
//           </div>
//           <div className="profile">
//             <div className="avatar">{displayName?.slice(0, 1)}</div>
//             <span>{displayName}</span>
//           </div>
//         </header>

//         {session.role === "super" ? (
//           <SuperAdminPanel data={data} commit={commit} view={view} query={query} />
//         ) : (
//           <AdminPanel
//             data={data}
//             commit={commit}
//             view={view}
//             query={query}
//             schoolId={currentAdmin?.schoolId}
//             classes={classes}
//             subjects={subjects}
//             teachers={teachers}
//             notices={notices}
//             leaves={leaves}
//             complaints={complaints}
//             homework={homework}
//             schedules={schedules}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// function viewTitle(view) {
//   const titles = {
//     dashboard: "Dashboard",
//     admins: "Admin Management",
//     schools: "School Details",
//     users: "All Users",
//     teachers: "Teacher Management",
//     classes: "Subject and Class Setup",
//     notices: "Notice Board",
//     leave: "Leave Approval",
//     complaints: "Complaint Desk",
//     homework: "Homework Monitor",
//     schedule: "Teacher Schedule"
//   };
//   return titles[view] || "Dashboard";
// }

// function Login({ data, onLogin }) {
//   const [role, setRole] = useState("super");
//   const [selectedAdmin, setSelectedAdmin] = useState(data.admins[0]?.id || "");

//   const adminsWithSchool = useMemo(() => {
//     return data.admins.map((admin) => {
//       const school = data.schools.find((item) => item.id === admin.schoolId);
//       return { ...admin, schoolName: school?.name };
//     });
//   }, [data.admins, data.schools]);

//   return (
//     <section className="login-container">
//       <div className="login-art">
//         <div className="brand-mark large"><ShieldCheck size={34} /></div>
//         <h1>School Admin Portal</h1>
//         <p>One React project for platform Super Admin and school Admin operations.</p>
//         <div className="login-stats">
//           <span><strong>{data.schools.length}</strong> Schools</span>
//           <span><strong>{data.admins.length}</strong> Admins</span>
//           <span><strong>{data.teachers.length + data.students.length + data.admins.length}</strong> Users</span>
//         </div>
//       </div>
//       <div className="login-card">
//         <p className="eyebrow">Role based access</p>
//         <h2>Sign in</h2>
//         <div className="form-group">
//           <label>Panel</label>
//           <select value={role} onChange={(event) => setRole(event.target.value)}>
//             <option value="super">Super Admin</option>
//             <option value="admin">School Admin</option>
//           </select>
//         </div>

//         {role === "admin" && (
//           <div className="form-group">
//             <label>Admin Account</label>
//             <select value={selectedAdmin} onChange={(event) => setSelectedAdmin(event.target.value)}>
//               {adminsWithSchool.map((admin) => (
//                 <option key={admin.id} value={admin.id}>
//                   {admin.name} ({admin.schoolName})
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <button className="primary" onClick={() => {
//           const userId = role === "super" ? data.superAdmin.id : selectedAdmin;
//           onLogin({ role, userId });
//         }}>
//           Open {role === "super" ? "Super Admin" : "Admin"} Panel
//         </button>

//         <div className="quick-login">
//           <button onClick={() => onLogin({ role: "super", userId: data.superAdmin.id })}>Demo Super Admin</button>
//           <button onClick={() => onLogin({ role: "admin", userId: data.admins[0]?.id })}>Demo School Admin</button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function SuperAdminPanel({ data, commit, view, query }) {
//   const users = useMemo(() => [
//     ...data.admins.map((item) => ({ name: item.name, role: "Admin", schoolId: item.schoolId, email: item.email })),
//     ...data.teachers.map((item) => ({ name: item.name, role: "Teacher", schoolId: item.schoolId, email: item.email })),
//     ...data.students.map((item) => ({ name: item.name, role: "Student", schoolId: item.schoolId, email: item.parent }))
//   ], [data]);

//   const filteredUsers = users.filter((user) => 
//     `${user.name} ${user.role} ${user.email}`.toLowerCase().includes(query.toLowerCase())
//   );

//   if (view === "admins") {
//     return (
//       <div className="grid two">
//         <section className="panel">
//           <PanelHead title="Create Admin" icon={Plus} />
//           <AdminCreateForm data={data} commit={commit} />
//         </section>
//         <section className="panel">
//           <PanelHead title="Admin List" icon={UserCog} meta={`${data.admins.length} admins`} />
//           <AdminTable admins={data.admins} schools={data.schools} />
//         </section>
//       </div>
//     );
//   }

//   if (view === "schools") {
//     return (
//       <section className="panel">
//         <PanelHead title="Total Schools" icon={Building2} meta={`${data.schools.length} schools`} />
//         <SchoolTable schools={data.schools} admins={data.admins} />
//       </section>
//     );
//   }

//   if (view === "users") {
//     return (
//       <section className="panel">
//         <PanelHead title="Total Users" icon={Users} meta={`${users.length} users`} />
//         <UserTable users={filteredUsers} schools={data.schools} />
//       </section>
//     );
//   }

//   return (
//     <>
//       <div className="stats">
//         <StatCard icon={School} label="Total Schools" value={data.schools.length} tone="teal" />
//         <StatCard icon={UserCog} label="Total Admins" value={data.admins.length} tone="blue" />
//         <StatCard icon={Users} label="Total Users" value={users.length} tone="gold" />
//         <StatCard icon={GraduationCap} label="Teachers" value={data.teachers.length} tone="rose" />
//       </div>
//       <div className="grid two">
//         <section className="panel">
//           <PanelHead title="School Details" icon={School} />
//           <SchoolTable schools={data.schools} admins={data.admins} />
//         </section>
//         <section className="panel">
//           <PanelHead title="Recent Admins" icon={UserCog} />
//           <AdminTable admins={data.admins.slice(-4)} schools={data.schools} />
//         </section>
//       </div>
//     </>
//   );
// }

// function AdminCreateForm({ data, commit }) {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", schoolName: "", city: "", board: "CBSE" });

//   const update = (field, value) => setForm({ ...form, [field]: value });

//   function submit(event) {
//     event.preventDefault();
//     const schoolId = uid("school");
//     const adminId = uid("admin");
//     commit({
//       ...data,
//       schools: [...data.schools, { id: schoolId, name: form.schoolName, city: form.city, board: form.board, adminId }],
//       admins: [...data.admins, { id: adminId, name: form.name, email: form.email, phone: form.phone, schoolId }]
//     });
//     setForm({ name: "", email: "", phone: "", schoolName: "", city: "", board: "CBSE" });
//   }

//   return (
//     <form className="form" onSubmit={submit}>
//       <Input label="Admin Name" value={form.name} onChange={(value) => update("name", value)} required />
//       <Input label="Admin Email" type="email" value={form.email} onChange={(value) => update("email", value)} required />
//       <Input label="Phone" value={form.phone} onChange={(value) => update("phone", value)} required />
//       <Input label="School Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} required />
//       <Input label="City" value={form.city} onChange={(value) => update("city", value)} required />
//       <div className="form-group">
//         <label>Board</label>
//         <select value={form.board} onChange={(event) => update("board", event.target.value)}>
//           <option>CBSE</option>
//           <option>ICSE</option>
//           <option>State</option>
//           <option>IB</option>
//         </select>
//       </div>
//       <button className="primary">Create admin and school</button>
//     </form>
//   );
// }

// function AdminPanel(props) {
//   const { view, teachers, classes, subjects, notices, leaves, complaints, homework, schedules } = props;

//   if (view === "teachers") return <TeacherManager {...props} />;
//   if (view === "classes") return <ClassSubjectManager {...props} />;
//   if (view === "notices") return <NoticeManager {...props} />;
//   if (view === "leave") return <LeaveManager {...props} />;
//   if (view === "complaints") return <ComplaintManager {...props} />;
//   if (view === "homework") return <HomeworkManager {...props} />;
//   if (view === "schedule") return <ScheduleManager {...props} />;

//   return (
//     <>
//       <div className="stats">
//         <StatCard icon={GraduationCap} label="Teachers" value={teachers.length} tone="teal" />
//         <StatCard icon={BookOpen} label="Classes" value={classes.length} tone="blue" />
//         <StatCard icon={Megaphone} label="Notices" value={notices.length} tone="gold" />
//         <StatCard icon={ClipboardCheck} label="Pending Leave" value={leaves.filter((item) => item.status === "Pending").length} tone="rose" />
//       </div>
//       <div className="grid two">
//         <section className="panel">
//           <PanelHead title="Teacher Schedule" icon={CalendarDays} />
//           <ScheduleTable schedules={schedules} teachers={teachers} />
//         </section>
//         <section className="panel">
//           <PanelHead title="Latest Notices" icon={Megaphone} />
//           <NoticeList notices={notices} />
//         </section>
//       </div>
//     </>
//   );
// }

// function TeacherManager({ data, commit, schoolId, teachers, classes }) {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", className: classes[0] || "" });
//   const update = (field, value) => setForm({ ...form, [field]: value });

//   function submit(event) {
//     event.preventDefault();
//     commit({
//       ...data,
//       teachers: [...data.teachers, { id: uid("teacher"), ...form, schoolId }]
//     });
//     setForm({ name: "", email: "", subject: "", className: classes[0] || "" });
//   }

//   return (
//     <div className="grid two">
//       <section className="panel">
//         <PanelHead title="Create Teacher" icon={Plus} />
//         <form className="form" onSubmit={submit}>
//           <Input label="Teacher Name" value={form.name} onChange={(value) => update("name", value)} required />
//           <Input label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} required />
//           <Input label="Subject" value={form.subject} onChange={(value) => update("subject", value)} required />
//           <div className="form-group">
//             <label>Class</label>
//             <select value={form.className} onChange={(event) => update("className", event.target.value)}>
//               {classes.map((className) => <option key={className}>{className}</option>)}
//             </select>
//           </div>
//           <button className="primary">Create teacher</button>
//         </form>
//       </section>
//       <section className="panel">
//         <PanelHead title="Teacher List" icon={GraduationCap} meta={`${teachers.length} teachers`} />
//         <TeacherTable teachers={teachers} />
//       </section>
//     </div>
//   );
// }

// function ClassSubjectManager({ data, commit, schoolId, classes, subjects }) {
//   const [form, setForm] = useState({ className: "", name: "" });

//   function submit(event) {
//     event.preventDefault();
//     commit({ ...data, subjects: [...data.subjects, { id: uid("subject"), ...form, schoolId }] });
//     setForm({ className: "", name: "" });
//   }

//   return (
//     <div className="grid two">
//       <section className="panel">
//         <PanelHead title="Add Subject & Class" icon={BookOpen} />
//         <form className="form" onSubmit={submit}>
//           <Input label="Class" value={form.className} onChange={(value) => setForm({ ...form, className: value })} placeholder="Example: 8A" required />
//           <Input label="Subject" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Example: Mathematics" required />
//           <button className="primary">Add subject</button>
//         </form>
//       </section>
//       <section className="panel">
//         <PanelHead title="Classes & Subjects" icon={BookOpen} meta={`${classes.length} classes`} />
//         <table className="styled-table">
//           <thead><tr><th>Class</th><th>Subject</th></tr></thead>
//           <tbody>{subjects.map((subject) => <tr key={subject.id}><td>{subject.className}</td><td>{subject.name}</td></tr>)}</tbody>
//         </table>
//       </section>
//     </div>
//   );
// }

// function NoticeManager({ data, commit, schoolId, notices, classes }) {
//   const [form, setForm] = useState({ title: "", audience: "All Classes", body: "" });

//   function submit(event) {
//     event.preventDefault();
//     commit({ ...data, notices: [...data.notices, { id: uid("notice"), ...form, date: today, schoolId }] });
//     setForm({ title: "", audience: "All Classes", body: "" });
//   }

//   return (
//     <div className="grid two">
//       <section className="panel">
//         <PanelHead title="Publish Notice" icon={Megaphone} />
//         <form className="form" onSubmit={submit}>
//           <Input label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
//           <div className="form-group">
//             <label>Audience</label>
//             <select value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })}>
//               <option>All Classes</option>
//               {classes.map((className) => <option key={className}>{className}</option>)}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Message</label>
//             <textarea value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} required rows={4} />
//           </div>
//           <button className="primary">Publish notice</button>
//         </form>
//       </section>
//       <section className="panel">
//         <PanelHead title="All Notices" icon={Megaphone} meta={`${notices.length} notices`} />
//         <NoticeList notices={notices} />
//       </section>
//     </div>
//   );
// }

// function LeaveManager({ data, commit, leaves }) {
//   function setStatus(id, status) {
//     commit({ ...data, leaves: data.leaves.map((item) => item.id === id ? { ...item, status } : item) });
//   }

//   return (
//     <section className="panel">
//       <PanelHead title="Approve/Reject Leave" icon={ClipboardCheck} meta={`${leaves.filter((item) => item.status === "Pending").length} pending`} />
//       <table className="styled-table">
//         <thead><tr><th>Student</th><th>Class</th><th>Dates</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave.id}>
//               <td>{leave.student}</td>
//               <td>{leave.className}</td>
//               <td>{leave.from} to {leave.to}</td>
//               <td>{leave.reason}</td>
//               <td><Badge tone={leave.status === "Rejected" ? "red" : leave.status === "Approved" ? "green" : "gold"}>{leave.status}</Badge></td>
//               <td className="actions">
//                 <button className="icon-btn accept" onClick={() => setStatus(leave.id, "Approved")} title="Approve"><CheckCircle2 size={17} /></button>
//                 <button className="icon-btn reject" onClick={() => setStatus(leave.id, "Rejected")} title="Reject"><XCircle size={17} /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// }

// function ComplaintManager({ data, commit, complaints }) {
//   function complete(id) {
//     commit({ ...data, complaints: data.complaints.map((item) => item.id === id ? { ...item, status: "Completed" } : item) });
//   }

//   return (
//     <section className="panel">
//       <PanelHead title="Complaint Desk" icon={Bell} meta={`${complaints.filter((item) => item.status !== "Completed").length} open`} />
//       <table className="styled-table">
//         <thead><tr><th>Student</th><th>Class</th><th>Complaint</th><th>Status</th><th>Action</th></tr></thead>
//         <tbody>
//           {complaints.map((complaint) => (
//             <tr key={complaint.id}>
//               <td>{complaint.student}</td>
//               <td>{complaint.className}</td>
//               <td>{complaint.issue}</td>
//               <td><Badge tone={complaint.status === "Completed" ? "green" : "red"}>{complaint.status}</Badge></td>
//               <td>{complaint.status !== "Completed" && <button className="small" onClick={() => complete(complaint.id)}>Complete</button>}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </section>
//   );
// }

// function HomeworkManager({ homework }) {
//   return (
//     <section className="panel">
//       <PanelHead title="Check Homework" icon={BookOpen} meta={`${homework.length} tasks`} />
//       <table className="styled-table">
//         <thead><tr><th>Title</th><th>Class</th><th>Subject</th><th>Teacher</th><th>Due</th></tr></thead>
//         <tbody>{homework.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.className}</td><td>{item.subject}</td><td>{item.teacher}</td><td>{item.due}</td></tr>)}</tbody>
//       </table>
//     </section>
//   );
// }

// function ScheduleManager({ data, commit, schoolId, schedules, teachers, classes, subjects }) {
//   const [form, setForm] = useState({ teacherId: teachers[0]?.id || "", className: classes[0] || "", subject: subjects[0]?.name || "", day: "Monday", time: "09:00 AM" });

//   function submit(event) {
//     event.preventDefault();
//     commit({ ...data, schedules: [...data.schedules, { id: uid("schedule"), ...form, schoolId }] });
//   }

//   return (
//     <div className="grid two">
//       <section className="panel">
//         <PanelHead title="Assign Teacher Schedule" icon={CalendarDays} />
//         <form className="form" onSubmit={submit}>
//           <div className="form-group">
//             <label>Teacher</label>
//             <select value={form.teacherId} onChange={(event) => setForm({ ...form, teacherId: event.target.value })}>
//               {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Class</label>
//             <select value={form.className} onChange={(event) => setForm({ ...form, className: event.target.value })}>
//               {classes.map((className) => <option key={className}>{className}</option>)}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Subject</label>
//             <select value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })}>
//               {subjects.map((subject) => <option key={subject.id} value={subject.name}>{subject.name}</option>)}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Day</label>
//             <select value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })}>
//               {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => <option key={day}>{day}</option>)}
//             </select>
//           </div>
//           <Input label="Time" value={form.time} onChange={(value) => setForm({ ...form, time: value })} required />
//           <button className="primary">Assign schedule</button>
//         </form>
//       </section>
//       <section className="panel">
//         <PanelHead title="Schedule List" icon={CalendarDays} meta={`${schedules.length} periods`} />
//         <ScheduleTable schedules={schedules} teachers={teachers} />
//       </section>
//     </div>
//   );
// }

// function PanelHead({ title, icon: Icon, meta }) {
//   return (
//     <div className="panel-head">
//       <div><Icon size={20} /><h2>{title}</h2></div>
//       {meta && <Badge tone="blue">{meta}</Badge>}
//     </div>
//   );
// }

// function Input({ label, value, onChange, type = "text", ...props }) {
//   return (
//     <div className="form-group">
//       <label>{label}</label>
//       <input type={type} value={value} onChange={(event) => onChange(event.target.value)} {...props} />
//     </div>
//   );
// }

// function SchoolTable({ schools, admins }) {
//   return (
//     <table className="styled-table">
//       <thead><tr><th>School</th><th>City</th><th>Board</th><th>Admin</th></tr></thead>
//       <tbody>{schools.map((school) => {
//         const admin = admins.find((item) => item.schoolId === school.id);
//         return <tr key={school.id}><td>{school.name}</td><td>{school.city}</td><td>{school.board}</td><td>{admin?.name || "Not assigned"}</td></tr>;
//       })}</tbody>
//     </table>
//   );
// }

// function AdminTable({ admins, schools }) {
//   return (
//     <table className="styled-table">
//       <thead><tr><th>Admin</th><th>Email</th><th>Phone</th><th>School</th></tr></thead>
//       <tbody>{admins.map((admin) => {
//         const school = schools.find((item) => item.id === admin.schoolId);
//         return <tr key={admin.id}><td>{admin.name}</td><td>{admin.email}</td><td>{admin.phone}</td><td>{school?.name || "N/A"}</td></tr>;
//       })}</tbody>
//     </table>
//   );
// }

// function UserTable({ users, schools }) {
//   if (!users.length) return <EmptyState>No users matched your search.</EmptyState>;
//   return (
//     <table className="styled-table">
//       <thead><tr><th>Name</th><th>Role</th><th>School</th><th>Contact / Parent</th></tr></thead>
//       <tbody>{users.map((user, index) => {
//         const school = schools.find((item) => item.id === user.schoolId);
//         return <tr key={`${user.name}-${index}`}><td>{user.name}</td><td><Badge tone="purple">{user.role}</Badge></td><td>{school?.name || "System"}</td><td>{user.email}</td></tr>;
//       })}</tbody>
//     </table>
//   );
// }

// function TeacherTable({ teachers }) {
//   if (!teachers.length) return <EmptyState>No teachers registered.</EmptyState>;
//   return (
//     <table className="styled-table">
//       <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Class</th></tr></thead>
//       <tbody>{teachers.map((teacher) => <tr key={teacher.id}><td>{teacher.name}</td><td>{teacher.email}</td><td>{teacher.subject}</td><td>{teacher.className}</td></tr>)}</tbody>
//     </table>
//   );
// }

// function NoticeList({ notices }) {
//   if (!notices.length) return <EmptyState>No notice published yet.</EmptyState>;
//   return (
//     <div className="notice-list">
//       {notices.slice().reverse().map((notice) => (
//         <article key={notice.id} className="notice-card">
//           <strong>{notice.title}</strong>
//           <p>{notice.body}</p>
//           <div className="notice-meta"><Badge tone="teal">{notice.audience}</Badge><Badge tone="gold">{notice.date}</Badge></div>
//         </article>
//       ))}
//     </div>
//   );
// }

// function ScheduleTable({ schedules, teachers }) {
//   if (!schedules.length) return <EmptyState>No teacher schedule assigned.</EmptyState>;
//   return (
//     <table className="styled-table">
//       <thead><tr><th>Teacher</th><th>Class</th><th>Subject</th><th>Day</th><th>Time</th></tr></thead>
//       <tbody>{schedules.map((schedule) => {
//         const teacher = teachers.find((item) => item.id === schedule.teacherId);
//         return <tr key={schedule.id}><td>{teacher?.name || "Unknown"}</td><td>{schedule.className}</td><td>{schedule.subject}</td><td>{schedule.day}</td><td>{schedule.time}</td></tr>;
//       })}</tbody>
//     </table>
//   );
// }