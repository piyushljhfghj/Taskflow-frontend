
// // -----------------------------------------------------
// // src/pages/AdminDashboard.jsx

// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";
// import { Plus, LogOut } from "lucide-react";

// import AdminUsersTable from "../components/AdminUsersTable";
// import AdminTasksTable from "../components/AdminTasksTable";
// import EditTaskModal from "../components/EditTaskModal";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [selectedUserName, setSelectedUserName] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [loadingTasks, setLoadingTasks] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     navigate("/login");
//   };

//   // Fetch all users
//   const fetchUsers = async () => {
//     setLoadingUsers(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem("token");
//       const { data } = await API.get("/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(data.users || []);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       setError(err.response?.data?.message || "Failed to fetch users");
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         handleLogout();
//       }
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Load tasks for specific user
//   const loadUserTasks = useCallback(
//     async (userId) => {
//       setSelectedUserId(userId);
//       const selectedUser = users.find((u) => u._id === userId);
//       setSelectedUserName(selectedUser ? selectedUser.name : "Selected User");
//       setLoadingTasks(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await API.get(`/admin/users/${userId}/tasks`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(data.tasks || []);
//       } catch (err) {
//         console.error("Failed to fetch tasks:", err);
//         setTasks([]);
//         setError(err.response?.data?.message || "Failed to fetch tasks");
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           handleLogout();
//         }
//       } finally {
//         setLoadingTasks(false);
//       }
//     },
//     [users]
//   );

//   // Delete user
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await API.delete(`/admin/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//       if (selectedUserId === userId) {
//         setTasks([]);
//         setSelectedUserId(null);
//         setSelectedUserName("");
//       }
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//       setError(err.response?.data?.message || "Failed to delete user");
//     }
//   };

//   // Delete task
//   const handleDeleteTask = async (taskId) => {
//     if (!selectedUserId) return setError("No user selected");
//     if (!window.confirm("Delete this task?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await API.delete(`/admin/users/${selectedUserId}/tasks/${taskId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks((prev) => prev.filter((t) => t._id !== taskId));
//     } catch (err) {
//       console.error("Failed to delete task:", err);
//       setError(err.response?.data?.message || "Failed to delete task");
//     }
//   };

//   // Save task (edit or add)
//   const handleTaskSave = useCallback(
//     async (taskData) => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!selectedUserId) throw new Error("No user selected");
//         if (taskData._id) {
//           await API.put(
//             `/admin/users/${selectedUserId}/tasks/${taskData._id}`,
//             taskData,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//         } else {
//           await API.post(`/admin/users/${selectedUserId}/tasks`, taskData, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
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
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6 space-y-8">
//       {/* Header bar with Logout */}
//       <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 rounded-2xl">
//         <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">
//           Admin Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>

//       {error && <div className="text-red-600 font-medium">{error}</div>}

//       {/* USERS TABLE */}
//       <section className="bg-white shadow-md p-6 rounded-2xl border border-purple-100">
//         <h2 className="text-xl font-semibold mb-4 text-purple-700">
//           Registered Users
//         </h2>

//         {loadingUsers ? (
//           <p>Loading users...</p>
//         ) : (
//           <AdminUsersTable
//             users={users}
//             onViewTasks={loadUserTasks}
//             onDelete={handleDeleteUser}
//             showSerialNumber={true}
//           />
//         )}
//       </section>

//       {/* USER TASKS TABLE */}
//       {selectedUserId && (
//         <section className="bg-white shadow-md p-6 rounded-2xl border border-purple-100">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-purple-700">
//               Tasks for{" "}
//               <span className="text-fuchsia-700 font-bold">
//                 {selectedUserName || "Selected User"}
//               </span>
//             </h2>
//             <button
//               onClick={() => {
//                 setSelectedTask(null);
//                 setShowTaskModal(true);
//               }}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 shadow-sm transition"
//             >
//               <Plus size={16} /> Add Task
//             </button>
//           </div>

//           {loadingTasks ? (
//             <p>Loading tasks...</p>
//           ) : (
//             <AdminTasksTable
//               tasks={tasks}
//               onEdit={(task) => {
//                 setSelectedTask(task);
//                 setShowTaskModal(true);
//               }}
//               onDelete={handleDeleteTask}
//               onAdd={() => {
//                 setSelectedTask(null);
//                 setShowTaskModal(true);
//               }}
//               showDueDate={true}
//             />
//           )}
//         </section>
//       )}

//       <EditTaskModal
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



// -----------------------------------------------





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

