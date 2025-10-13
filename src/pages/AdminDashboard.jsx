// // src/pages/AdminDashboard.jsx
// import { useState, useEffect, useCallback } from "react";
// import API from "../api";
// import TaskModal from "../components/TaskModal";
// import TaskItem from "../components/TaskItem";
// import { Plus, Trash2, Edit2 } from "lucide-react";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const { data } = await API.get("/admin/users");
//       setUsers(data.users);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Load tasks for a specific user
//   const loadUserTasks = useCallback(async (userId) => {
//     setSelectedUserId(userId);
//     try {
//       const { data } = await API.get(`/admin/users/${userId}/tasks`);
//       setTasks(data.tasks);
//     } catch (err) {
//       console.error("Failed to fetch tasks:", err);
//       setTasks([]);
//     }
//   }, []);

//   // Delete a user
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await API.delete(`/admin/users/${userId}`);
//       setUsers(users.filter(u => u._id !== userId));
//       if (selectedUserId === userId) setTasks([]);
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     }
//   };

//   // Delete a user task
//   const handleDeleteTask = async (taskId) => {
//     if (!window.confirm("Delete this task?")) return;
//     try {
//       await API.delete(`/admin/users/${selectedUserId}/tasks/${taskId}`);
//       setTasks(tasks.filter(t => t._id !== taskId));
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//     }
//   };

//   // Save task (edit or add)
//   const handleTaskSave = useCallback(async (taskData) => {
//     try {
//       if (taskData._id) {
//         await API.put(`/admin/users/${selectedUserId}/tasks/${taskData._id}`, taskData);
//       } else {
//         await API.post(`/tasks`, { ...taskData, user: selectedUserId });
//       }
//       loadUserTasks(selectedUserId);
//       setShowTaskModal(false);
//       setSelectedTask(null);
//     } catch (err) {
//       console.error("Failed to save task:", err);
//     }
//   }, [selectedUserId, loadUserTasks, tasks]);

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {/* USERS */}
//       <section className="bg-white shadow p-4 rounded">
//         <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
//         <ul className="space-y-2">
//           {users.map(u => (
//             <li key={u._id} className="flex justify-between items-center border p-2 rounded">
//               <span>{u.name} ({u.email}) - <strong>{u.role}</strong></span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => loadUserTasks(u._id)}
//                   className="px-2 py-1 bg-blue-600 text-white rounded"
//                 >
//                   View Tasks
//                 </button>
//                 <button
//                   onClick={() => handleDeleteUser(u._id)}
//                   className="px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1"
//                 >
//                   <Trash2 size={14} /> Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* USER TASKS */}
//       {selectedUserId && (
//         <section className="bg-white shadow p-4 rounded">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Tasks for Selected User</h2>
//             <button
//               onClick={() => setShowTaskModal(true)}
//               className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1"
//             >
//               <Plus size={14} /> Add Task
//             </button>
//           </div>

//           {tasks.length === 0 ? (
//             <p>No tasks for this user</p>
//           ) : (
//             <ul className="space-y-2">
//               {tasks.map(task => (
//                 <li key={task._id} className="flex justify-between items-center border p-2 rounded">
//                   <div>
//                     <h3 className="font-semibold">{task.title}</h3>
//                     <p className="text-sm text-gray-500">{task.description}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => { setSelectedTask(task); setShowTaskModal(true); }}
//                       className="px-2 py-1 bg-yellow-500 text-white rounded flex items-center gap-1"
//                     >
//                       <Edit2 size={14} /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTask(task._id)}
//                       className="px-2 py-1 bg-red-600 text-white rounded flex items-center gap-1"
//                     >
//                       <Trash2 size={14} /> Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       )}

//       {/* TASK MODAL */}
//       <TaskModal
//         isOpen={showTaskModal || !!selectedTask}
//         onClose={() => { setShowTaskModal(false); setSelectedTask(null); }}
//         taskToEdit={selectedTask}
//         onSave={handleTaskSave}
//       />
//     </div>
//   );
// };

// export default AdminDashboard;









// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import TaskModal from "../components/TaskModal";
// import TaskItem from "../components/TaskItem";
// import { Plus, Trash2, Edit2 } from "lucide-react";

// // ✅ Newly added imports
// import AdminUsersTable from "../components/AdminUsersTable";
// import AdminTasksTable from "../components/AdminTasksTable";
// import EditTaskModal from "../components/EditTaskModal";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Fetch all users
//   const fetchUsers = async () => {
//     setLoadingUsers(true);
//     setError(null);
//     try {
//       const { data } = await API.get("/admin/users");
//       setUsers(data.users);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       setError(err.response?.data?.message || "Failed to fetch users");
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("currentUser");
//         navigate("/login");
//       }
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Load tasks for specific user
//   const loadUserTasks = useCallback(
//     async (userId) => {
//       setSelectedUserId(userId);
//       setLoadingTasks(true);
//       setError(null);
//       try {
//         const { data } = await API.get(`/admin/users/${userId}/tasks`);
//         setTasks(data.tasks);
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//         setTasks([]);
//         setError(err.response?.data?.message || "Failed to fetch tasks");
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("currentUser");
//           navigate("/login");
//         }
//       } finally {
//         setLoadingTasks(false);
//       }
//     },
//     [navigate]
//   );

//   // ✅ Delete user
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await API.delete(`/admin/users/${userId}`);
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//       if (selectedUserId === userId) setTasks([]);
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//       setError(err.response?.data?.message || "Failed to delete user");
//     }
//   };

//   // ✅ Delete task
//   const handleDeleteTask = async (taskId) => {
//     if (!window.confirm("Delete this task?")) return;
//     try {
//       await API.delete(`/admin/users/${selectedUserId}/tasks/${taskId}`);
//       setTasks((prev) => prev.filter((t) => t._id !== taskId));
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//       setError(err.response?.data?.message || "Failed to delete task");
//     }
//   };

//   // ✅ Save task (edit or add)
//   const handleTaskSave = useCallback(
//     async (taskData) => {
//       try {
//         if (!selectedUserId) throw new Error("No user selected");
//         if (taskData._id) {
//           await API.put(
//             `/admin/users/${selectedUserId}/tasks/${taskData._id}`,
//             taskData
//           );
//         } else {
//           await API.post(`/admin/users/${selectedUserId}/tasks`, taskData);
//         }
//         await loadUserTasks(selectedUserId);
//         setShowTaskModal(false);
//         setSelectedTask(null);
//       } catch (err) {
//         console.error("Failed to save task:", err);
//         setError(err.response?.data?.message || "Failed to save task");
//       }
//     },
//     [selectedUserId, loadUserTasks]
//   );

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {error && <div className="text-red-600">{error}</div>}

//       {/* ✅ USERS TABLE COMPONENT */}
//       <section className="bg-white shadow p-4 rounded">
//         <h2 className="text-xl font-semibold mb-4">Registered Users</h2>

//         {loadingUsers ? (
//           <p>Loading users...</p>
//         ) : (
//           <AdminUsersTable
//             users={users}
//             onViewTasks={loadUserTasks}
//             onDeleteUser={handleDeleteUser}
//           />
//         )}
//       </section>

//       {/* ✅ USER TASKS TABLE COMPONENT */}
//       {selectedUserId && (
//         <section className="bg-white shadow p-4 rounded">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Tasks for Selected User</h2>
//             <button
//               onClick={() => setShowTaskModal(true)}
//               className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-1"
//             >
//               <Plus size={14} /> Add Task
//             </button>
//           </div>

//           {loadingTasks ? (
//             <p>Loading tasks...</p>
//           ) : (
//             <AdminTasksTable
//               tasks={tasks}
//               onEditTask={(task) => {
//                 setSelectedTask(task);
//                 setShowTaskModal(true);
//               }}
//               onDeleteTask={handleDeleteTask}
//             />
//           )}
//         </section>
//       )}

//       {/* ✅ EDIT TASK MODAL */}
//       <EditTaskModal
//         isOpen={showTaskModal || !!selectedTask}
//         onClose={() => {
//           setShowTaskModal(false);
//           setSelectedTask(null);
//         }}
//         taskToEdit={selectedTask}
//         onSave={handleTaskSave}
//       />

//       {/* ✅ OLD TASK MODAL (fallback support) */}
//       <TaskModal
//         isOpen={showTaskModal}
//         onClose={() => {
//           setShowTaskModal(false);
//           setSelectedTask(null);
//         }}
//         taskToEdit={selectedTask}
//         onSave={handleTaskSave}
//       />
//     </div>
//   );
// };

// export default AdminDashboard;


// -----------------------------------------------------
// src/pages/AdminDashboard.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Plus, LogOut } from "lucide-react";

import AdminUsersTable from "../components/AdminUsersTable";
import AdminTasksTable from "../components/AdminTasksTable";
import EditTaskModal from "../components/EditTaskModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err.response?.data?.message || "Failed to fetch users");
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Load tasks for specific user
  const loadUserTasks = useCallback(
    async (userId) => {
      setSelectedUserId(userId);
      const selectedUser = users.find((u) => u._id === userId);
      setSelectedUserName(selectedUser ? selectedUser.name : "Selected User");
      setLoadingTasks(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(`/admin/users/${userId}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(data.tasks || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
        setError(err.response?.data?.message || "Failed to fetch tasks");
        if (err.response?.status === 401 || err.response?.status === 403) {
          handleLogout();
        }
      } finally {
        setLoadingTasks(false);
      }
    },
    [users]
  );

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      if (selectedUserId === userId) {
        setTasks([]);
        setSelectedUserId(null);
        setSelectedUserName("");
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!selectedUserId) return setError("No user selected");
    if (!window.confirm("Delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admin/users/${selectedUserId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Save task (edit or add)
  const handleTaskSave = useCallback(
    async (taskData) => {
      try {
        const token = localStorage.getItem("token");
        if (!selectedUserId) throw new Error("No user selected");
        if (taskData._id) {
          await API.put(
            `/admin/users/${selectedUserId}/tasks/${taskData._id}`,
            taskData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await API.post(`/admin/users/${selectedUserId}/tasks`, taskData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        await loadUserTasks(selectedUserId);
        setShowTaskModal(false);
        setSelectedTask(null);
      } catch (err) {
        console.error("Failed to save task:", err);
        setError(err.response?.data?.message || "Failed to save task");
      }
    },
    [selectedUserId, loadUserTasks]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6 space-y-8">
      {/* Header bar with Logout */}
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-2xl">
        <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {error && <div className="text-red-600 font-medium">{error}</div>}

      {/* USERS TABLE */}
      <section className="bg-white shadow-md p-6 rounded-2xl border border-purple-100">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">
          Registered Users
        </h2>

        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <AdminUsersTable
            users={users}
            onViewTasks={loadUserTasks}
            onDelete={handleDeleteUser}
            showSerialNumber={true}
          />
        )}
      </section>

      {/* USER TASKS TABLE */}
      {selectedUserId && (
        <section className="bg-white shadow-md p-6 rounded-2xl border border-purple-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-700">
              Tasks for{" "}
              <span className="text-fuchsia-700 font-bold">
                {selectedUserName || "Selected User"}
              </span>
            </h2>
            <button
              onClick={() => {
                setSelectedTask(null);
                setShowTaskModal(true);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 shadow-sm transition"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>

          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : (
            <AdminTasksTable
              tasks={tasks}
              onEdit={(task) => {
                setSelectedTask(task);
                setShowTaskModal(true);
              }}
              onDelete={handleDeleteTask}
              onAdd={() => {
                setSelectedTask(null);
                setShowTaskModal(true);
              }}
              showDueDate={true}
            />
          )}
        </section>
      )}

      <EditTaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        taskToEdit={selectedTask}
        onSave={handleTaskSave}
      />
    </div>
  );
};

export default AdminDashboard;




// // ✅ Full working AdminRoutes.jsx with task view + add/edit support
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TaskModal from "../components/TaskModal";
// import { Button } from "@/components/ui/button";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editTask, setEditTask] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ✅ Fetch all registered users
// const fetchUsers = async () => {
//   try {
//     const res = await axios.get("/users");
//     // ensure users is always an array
//     setUsers(Array.isArray(res.data) ? res.data : res.data.users || []);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     setUsers([]);
//   }
// };


//   // ✅ Fetch tasks for a selected user
//   const fetchTasks = async (userId) => {
//     try {
//       const res = await axios.get(`/tasks/user/${userId}`);
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       setTasks([]);
//     }
//   };

//   // ✅ When admin clicks “View Tasks”
//   const handleViewTasks = (user) => {
//     setSelectedUser(user);
//     fetchTasks(user._id);
//   };

//   // ✅ When admin clicks “Add Task”
//   const handleAddTask = () => {
//     if (!selectedUser) {
//       alert("Please select a user first by clicking 'View Tasks'");
//       return;
//     }
//     setEditTask(null);
//     setShowModal(true);
//   };

//   // ✅ When admin clicks “Edit Task”
//   const handleEditTask = (task) => {
//     setEditTask(task);
//     setShowModal(true);
//   };

//   // ✅ When task is saved (add/edit)
//   const handleTaskSaved = async () => {
//     setShowModal(false);
//     if (selectedUser) {
//       await fetchTasks(selectedUser._id);
//     }
//   };

//   // ✅ Delete task
//   const handleDeleteTask = async (taskId) => {
//     try {
//       await axios.delete(`/tasks/${taskId}`);
//       fetchTasks(selectedUser._id);
//     } catch (err) {
//       console.error("Error deleting task:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

//       <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
//         <h3 className="text-lg font-semibold mb-2">Registered Users</h3>
//         <table className="w-full border-collapse">
//           <thead className="bg-purple-100">
//             <tr>
//               <th className="text-left p-2">Name</th>
//               <th className="text-left p-2">Email</th>
//               <th className="text-left p-2">Role</th>
//               <th className="text-left p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="p-2">{user.name}</td>
//                 <td className="p-2">{user.email}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       user.role === "admin"
//                         ? "bg-purple-200 text-purple-800"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="p-2 flex gap-2">
//                   <Button
//                     className="bg-purple-600 hover:bg-purple-700 text-white"
//                     onClick={() => handleViewTasks(user)}
//                   >
//                     View Tasks
//                   </Button>
//                   <Button
//                     className="bg-red-500 hover:bg-red-600 text-white"
//                     onClick={async () => {
//                       if (window.confirm("Delete this user?")) {
//                         await axios.delete(`/users/${user._id}`);
//                         fetchUsers();
//                       }
//                     }}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedUser && (
//         <div className="bg-white rounded-2xl p-4 shadow-md">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-semibold">
//               Tasks for {selectedUser.name}
//             </h3>
//             <Button
//               className="bg-green-600 hover:bg-green-700 text-white"
//               onClick={handleAddTask}
//             >
//               + Add Task
//             </Button>
//           </div>

//           {tasks.length === 0 ? (
//             <p>No tasks for this user.</p>
//           ) : (
//             <table className="w-full border-collapse">
//               <thead className="bg-purple-100">
//                 <tr>
//                   <th className="text-left p-2">Title</th>
//                   <th className="text-left p-2">Status</th>
//                   <th className="text-left p-2">Priority</th>
//                   <th className="text-left p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task) => (
//                   <tr key={task._id} className="border-b">
//                     <td className="p-2">{task.title}</td>
//                     <td className="p-2">{task.status}</td>
//                     <td className="p-2">{task.priority}</td>
//                     <td className="p-2 flex gap-2">
//                       <Button
//                         className="bg-blue-500 hover:bg-blue-600 text-white"
//                         onClick={() => handleEditTask(task)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         className="bg-red-500 hover:bg-red-600 text-white"
//                         onClick={() => handleDeleteTask(task._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {/* ✅ Added: Task Modal (Add/Edit) */}
//       {showModal && (
//         <TaskModal
//           onClose={() => setShowModal(false)}
//           onSave={handleTaskSaved}
//           userId={selectedUser?._id}
//           editTask={editTask}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;








