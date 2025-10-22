// import { useState, useEffect, useCallback, useMemo } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import API from "../api"; // ✅ use centralized API

// const Layout = ({ user, onLogout }) => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {      
//       const { data } = await API.get("/tasks"); // ✅ token auto-attached
  
//       const arr = Array.isArray(data)
//         ? data
//         : Array.isArray(data.tasks)
//         ? data.tasks
//         : Array.isArray(data.data)
//         ? data.data
//         : [];

//       setTasks(arr);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//       setError(err.response?.data?.message || err.message || "Could not load tasks.");

//       if (err.response?.status === 401) {
//         onLogout(); // logout if token invalid
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [onLogout]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   const stats = useMemo(() => {
//     const completedTasks = tasks.filter(
//       (t) =>
//         t.completed === true ||
//         t.completed === 1 ||
//         (typeof t.completed === "string" && t.completed.toLowerCase() === "yes")
//     ).length;

//     const totalCount = tasks.length;
//     const pendingCount = totalCount - completedTasks;
//     const completionPercentage = totalCount
//       ? Math.round((completedTasks / totalCount) * 100)
//       : 0;

//     return { totalCount, completedTasks, pendingCount, completionPercentage };
//   }, [tasks]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar user={user} onLogout={onLogout} />
//       <Sidebar user={user} tasks={tasks} />
//       <div className="ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300">
//         {loading && <p>Loading tasks...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
//       </div>
//     </div>
//   );
// };

// export default Layout;



// ---------------------------------------------------------------------------



import { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import API from "../api"; // ✅ use centralized API

const Layout = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {      
      const { data } = await API.get("/tasks"); // ✅ token auto-attached
  
      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data.tasks)
        ? data.tasks
        : Array.isArray(data.data)
        ? data.data
        : [];

      setTasks(arr);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.response?.data?.message || err.message || "Could not load tasks.");

      if (err.response?.status === 401) {
        onLogout(); // logout if token invalid
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(
      (t) =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" && t.completed.toLowerCase() === "yes")
    ).length;

    const totalCount = tasks.length;
    const pendingCount = totalCount - completedTasks;
    const completionPercentage = totalCount
      ? Math.round((completedTasks / totalCount) * 100)
      : 0;

    return { totalCount, completedTasks, pendingCount, completionPercentage };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <Sidebar user={user} tasks={tasks} />
      <div className="ml-0 xl:ml-64 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300">
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
      </div>
    </div>
  );
};

export default Layout;


