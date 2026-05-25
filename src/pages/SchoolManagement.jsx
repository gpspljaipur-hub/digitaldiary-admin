import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Search, Filter, Building2, ChevronDown, Edit2, Trash2, CheckCircle2, ClipboardList, Activity, TrendingUp } from 'lucide-react';

const SchoolManagement = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  return (
    <div className="w-full h-full -mt-6 p-2">
      {/* Header Section */}
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
            onClick={() => navigate('/dashboard/school-registration')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1629] border border-[#0A1629] rounded-lg text-sm font-semibold text-white hover:bg-[#112441] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add School
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column: Filters + Table */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          
          {/* Filters Card */}
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
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>School Name</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>UDISE Code</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>District</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>Principal</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>Students</th>
                    <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider'>Status</th>
                    <th className='px-6 py-4 text-center text-xs font-semibold tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {schools.length > 0 ? (
                    schools.map((school, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs shrink-0">
                              {school?.name ? school.name.split(' ').map(n => n[0]).join('').substring(0, 2) : "NA"}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0A1629] leading-tight">{school.name || "NA"}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{school.type || "NA"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                          {school.udise || "NA"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                          {school.district || "NA"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                          {school.principal || "NA"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0A1629] font-bold">
                          {school.students ||"NA"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {school.status === 'ACTIVE' && <span className="px-3 py-1 inline-flex text-[10px] font-bold tracking-wider rounded bg-green-100 text-green-700">ACTIVE</span>}
                          {school.status === 'PENDING' && <span className="px-3 py-1 inline-flex text-[10px] font-bold tracking-wider rounded bg-orange-100 text-orange-700">PENDING</span>}
                          {school.status === 'INACTIVE' && <span className="px-3 py-1 inline-flex text-[10px] font-bold tracking-wider rounded bg-red-100 text-red-700">INACTIVE</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          <button className="text-blue-600 hover:text-blue-900 mr-4"><Edit2 size={16} /></button>
                          <button className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
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

        {/* Right Column: Stat Cards */}
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">
          
          {/* Card 1: Total Schools */}
          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border-2 border-[#0A1629] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Schools</p>
                <h3 className="text-4xl font-bold text-[#0A1629] mt-1 tracking-tight">1,482</h3>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#0A1629]">
                <Building2 size={20} />
              </div>
            </div>
            
            
          </div>

          {/* Card 2: Active Schools */}
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

          {/* Card 3: Pending Approvals */}
          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-red-200">
            <div className="flex justify-between items-start mb-5">
              <div>
                <p className="text-sm font-semibold text-gray-600">Pending Approvals</p>
                <h3 className="text-4xl font-bold text-[#0A1629] mt-1 tracking-tight">42</h3>
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
    </div>
  );
};

export default SchoolManagement;