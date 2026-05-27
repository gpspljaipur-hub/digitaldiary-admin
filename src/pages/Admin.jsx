import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Pagination from "../components/Pagination";

const Admin = () => {
    const [admins, setAdmins] = useState([
        {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            school: "SVVM School"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        school: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new admin to the list
        setAdmins([...admins, formData]);
        // Reset form and close modal
        setFormData({ name: "", email: "", phone: "", school: "" });
        setIsModalOpen(false);
    };

    const totalPages = Math.max(1, Math.ceil(admins.length / itemsPerPage));
    const currentAdmins = admins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full h-full p-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0B132B] mb-2">
                        Admin Management
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Manage your school administrators and roles
                    </p>
                </div>
                
                <div className="mt-4 md:mt-0">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#0A1629] hover:bg-[#112443] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm"
                    >
                        <Plus size={20} />
                        Create Admin
                    </button>
                </div>
            </div>
            
            <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#0B132B]">Admin List</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#f8f9fc] text-[#6b7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wide">S.No</th>
                                <th className="px-6 py-4 font-semibold tracking-wide">Name</th>
                                <th className="px-6 py-4 font-semibold tracking-wide">Email</th>
                                <th className="px-6 py-4 font-semibold tracking-wide">Phone</th>
                                <th className="px-6 py-4 font-semibold tracking-wide">School Name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-[#374151]">
                            {currentAdmins.map((admin, index) => (
                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-6 py-4 font-medium">{admin.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{admin.phone}</td>
                                    <td className="px-6 py-4 text-gray-600">{admin.school}</td>
                                </tr>
                            ))}
                            {currentAdmins.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No admins found. Click "Create Admin" to add one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-gray-100 flex justify-end">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        alwaysShow={true}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#0B132B]">Create New Admin</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. +91 9876543210"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. rahul@school.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">School Name</label>
                                    <input 
                                        type="text" 
                                        name="school"
                                        value={formData.school}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. SVVM Public School"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1629] focus:ring-1 focus:ring-[#0A1629] outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-[#0A1629] hover:bg-[#112443] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;