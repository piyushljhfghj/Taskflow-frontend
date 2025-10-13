import { Trash2, Eye } from "lucide-react";

const AdminUsersTable = ({ users, onViewTasks, onDelete, showSerialNumber = false }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-purple-700 mb-4">Registered Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-purple-100">
              <tr className="text-left text-gray-700">
                {/* ✅ Added S.No column */}
                {showSerialNumber && <th className="py-2 px-4">S.No</th>}
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  {/* ✅ Show S.No if enabled */}
                  {showSerialNumber && (
                    <td className="py-2 px-4 text-gray-600">{index + 1}</td>
                  )}
                  <td className="py-2 px-4 font-medium">{u.name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        u.role === "admin"
                          ? "bg-purple-200 text-purple-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => onViewTasks(u._id)}
                      className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition"
                    >
                      <Eye size={16} /> View Tasks
                    </button>
                    <button
                      onClick={() => onDelete(u._id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersTable;
