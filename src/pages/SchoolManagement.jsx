import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Search, Filter, Building2, ChevronDown, Edit2, Trash2, CheckCircle2, ClipboardList, Activity, TrendingUp, X, MapPin, Phone, BookOpen, AlertTriangle, BadgeCheck } from 'lucide-react';
import { useGetSchoolQuery } from '../redux/services/schoolApi';

const SchoolManagement = () => {
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); };

  
  const {data: response = []} = useGetSchoolQuery();
  const schools = response?.data || [];

  

  return (
    <div className="w-full h-full -mt-6 p-2">
     
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-[32px] font-bold text-[#0A1629]">School Management</h1>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Upload size={16} />
            Export
          </button>
          <button 
            onClick={() => setShowRegistrationForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1629] border border-[#0A1629] rounded-lg text-sm font-semibold text-white hover:bg-[#112441] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add School
          </button>
        </div>
      </div>

   
      <div className="flex flex-col xl:flex-row gap-6">
        
        
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
        
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-5 flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Search Schools</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="School name or UDISE..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors placeholder:text-gray-400 font-medium text-gray-800"
                />
              </div>
            </div>

            <div className="w-full md:w-44">
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">District</label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none font-medium text-gray-800">
                  <option>South Delhi</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="w-full md:w-44">
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Block</label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none font-medium text-gray-800">
                  <option>Block A-1</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="w-full md:w-44">
              <label className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Type</label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors appearance-none font-medium text-gray-800">
                  <option>High School</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <button className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors shrink-0">
              <Filter size={18} />
            </button>
          </div>

          {/* Table Card */}
          <div className='bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 flex flex-col h-[600px]'>
            <div className='overflow-x-auto flex-1'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-[#0A1629] text-white sticky top-0 z-10'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>S.No</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>School Name</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {schools.length > 0 ? (
                    schools.map((school, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                         <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#0A1629] leading-tight">{index+1}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#0A1629] leading-tight">{school.name || "NA"}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-gray-500 font-medium">
                        No Schools Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    
            
          </div>
        </div>

        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">

          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border-2 border-[#0A1629] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Schools</p>
                <h3 className="text-4xl font-bold text-[#0A1629] mt-1 tracking-tight">5000</h3>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#0A1629]">
                <Building2 size={20} />
              </div>
            </div>
            
            
          </div>

          
          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-blue-200 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-600">Active Schools</p>
                <h3 className="text-4xl font-bold text-[#0A1629] mt-1 tracking-tight">1,340</h3>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <CheckCircle2 size={20} />
              </div>
            </div>
        
          </div>

         
          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-red-200">
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-sm font-semibold text-gray-600">Pending Approvals</p>
                <h3 className="text-4xl font-bold text-[#0A1629] mt-1 tracking-tight">69</h3>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                <ClipboardList size={20} />
              </div>
            </div>
            <button className="w-full py-2.5 bg-[#C92A2A] hover:bg-[#A61E1E] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              Review Requests
            </button>
          </div>

        </div>
      </div>
    
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6 lg:p-8">
          <div className="bg-[#f8f9fc] w-full max-w-7xl max-h-full rounded-[24px] shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white z-10 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#0A1629]">New School Registration</h2>
                <p className="text-gray-500 text-sm mt-1">Enter formal school registration details to initialise an official profile in the DSDS registry.</p>
              </div>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col lg:flex-row w-full h-full bg-[#f8f9fc]   ">
            
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
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;