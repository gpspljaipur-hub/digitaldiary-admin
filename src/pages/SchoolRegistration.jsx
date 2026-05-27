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
                        Enter formal school registration details to initialise an official profile in the DSDS registry.
                    </p>
                </div>

              
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                  
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

         
            <div className="w-full lg:w-[380px] bg-white border-l border-gray-200 px-6 lg:px-8 pb-8 pt-4 shrink-0">
                <div className="sticky top-4 flex flex-col gap-6">
                
              
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

             
                <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(6,81,237,0.1)] border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h4 className="text-sm font-bold text-[#0A1629]">Submission Guidelines</h4>
                    </div>
                    <div className="p-3">
                        <div className="relative rounded-lg overflow-hidden h-28 bg-gray-900">
                           
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

