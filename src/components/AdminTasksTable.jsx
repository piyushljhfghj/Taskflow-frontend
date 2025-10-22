// import { Edit2, Trash2 } from "lucide-react";

// const AdminTasksTable = ({ tasks, onEdit, onDelete, onAdd, showDueDate = false }) => {
//   return (
//     <div className="bg-white shadow-md rounded-2xl p-5 mt-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-purple-700">User Tasks</h2>
//         <button
//           onClick={onAdd}
//           className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition"
//         >
//           + Add Task
//         </button>
//       </div>

//       {tasks.length === 0 ? (
//         <p className="text-gray-500">No tasks for this user.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead className="bg-purple-100">
//               <tr className="text-left text-gray-700">
//                 <th className="py-2 px-4">Title</th>
//                 <th className="py-2 px-4">Priority</th>
//                 <th className="py-2 px-4">Status</th>
//                 {/* ✅ Added Due Date column */}
//                 {showDueDate && <th className="py-2 px-4">Due Date</th>}
//                 <th className="py-2 px-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr
//                   key={task._id}
//                   className="border-b hover:bg-purple-50 transition"
//                 >
//                   <td className="py-2 px-4 font-medium">{task.title}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${
//                         task.priority === "High"
//                           ? "bg-red-100 text-red-700"
//                           : task.priority === "Medium"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {task.priority}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4">
//                     {task.completed ? (
//                       <span className="text-green-600 font-medium">Completed</span>
//                     ) : (
//                       <span className="text-gray-500">Pending</span>
//                     )}
//                   </td>

//                   {/* ✅ Added Due Date cell */}
//                   {showDueDate && (
//                     <td className="py-2 px-4 text-gray-700">
//                       {task.dueDate
//                         ? new Date(task.dueDate).toLocaleDateString()
//                         : "No due date"}
//                     </td>
//                   )}

//                   <td className="py-2 px-4 text-right flex gap-2 justify-end">
//                     <button
//                       onClick={() => onEdit(task)}
//                       className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
//                     >
//                       <Edit2 size={16} /> Edit
//                     </button>
//                     <button
//                       onClick={() => onDelete(task._id)}
//                       className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
//                     >
//                       <Trash2 size={16} /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminTasksTable;





// ----------------------------------------------------






import { Edit2, Trash2 } from "lucide-react";

const AdminTasksTable = ({ tasks, onEdit, onDelete, onAdd, showDueDate = false }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-purple-700">User Tasks</h2>
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition"
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks for this user.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-purple-100">
              <tr className="text-left text-gray-700">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Priority</th>
                <th className="py-2 px-4">Status</th>
                {/* ✅ Added Due Date column */}
                {showDueDate && <th className="py-2 px-4">Due Date</th>}
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="py-2 px-4 font-medium">{task.title}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {task.completed ? (
                      <span className="text-green-600 font-medium">Completed</span>
                    ) : (
                      <span className="text-gray-500">Pending</span>
                    )}
                  </td>

                  {/* ✅ Added Due Date cell */}
                  {showDueDate && (
                    <td className="py-2 px-4 text-gray-700">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No due date"}
                    </td>
                  )}

                  <td className="py-2 px-4 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(task)}
                      className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
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

export default AdminTasksTable;
