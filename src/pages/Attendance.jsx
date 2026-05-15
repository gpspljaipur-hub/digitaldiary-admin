import React from "react";



const Attendance = () => {
  return (
    <div className="relative">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Attendance</h2>


            <div className="flex gap-4 ">
            <select className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 min-w-[200px]">
                <option value="">Select Teacher</option>
                <option value="ruu">Ruppa devi</option> 
                <option value="bahi">Kambli bahi</option>
                <option value="ra">Ramkishor</option>
                <option value="chai">Mamaji chai store</option>

            </select>

            <input
                type="date"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            
            />
        </div>
        </div>
        
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">  
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">               
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                S.No    
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Student Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Class Name  
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Subject Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-10 text-center text-gray-500" colSpan="6">
                                No Attendance Records Found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Attendance;