import React, { useState } from 'react'

const User = () => {
  // Using state to prepare for future API integration
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      email: "john.doe@example.com",
      contact: "+1 234 567 890"
    }
  ]);

  return (
    <div className="w-full h-full p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0B132B] mb-2">User List</h2>
          <p className="text-gray-500 text-sm">
            View and manage all system users
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-[20px] overflow-hidden border border-gray-50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#f8f9fc] text-[#6b7280]">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  S.No
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Name
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Role
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Email
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#374151]">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.contact}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default User