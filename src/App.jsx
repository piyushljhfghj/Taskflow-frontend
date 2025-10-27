// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
// import Layout from "./components/Layout.jsx";
// import Profile from "./components/Profile.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import PendingPage from "./pages/PendingPage.jsx";
// import CompletePage from "./pages/CompletePage.jsx";
// import Login from "./components/Login.jsx";
// import SignUp from "./components/SignUp.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import API from "./api.js";

// // ✅ Ensure Axios uses correct baseURL
// API.defaults.baseURL = "http://localhost:4000/api";

// function ProtectedLayout({ onLogout, user }) {
//   return (
//     <Layout user={user} onLogout={onLogout}>
//       <Outlet />
//     </Layout>
//   );
// }

// export default function App() {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) setCurrentUser(JSON.parse(storedUser));
//   }, []);

//   // ✅ This now only handles final login/signup success
//   const handleAuthSubmit = async (data) => {
//     if (!data.user) return;
//     localStorage.setItem("currentUser", JSON.stringify(data.user));
//     setCurrentUser(data.user);

//     if (data.user.role === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     navigate("/login");
//   };

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route
//         path="/login"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <Login
//               onSubmit={handleAuthSubmit} // ✅ Receives final login data
//               onSwitchMode={() => navigate("/signup")}
//             />
//           </div>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <SignUp
//               onSubmit={handleAuthSubmit}
//               onSwitchMode={() => navigate("/login")}
//             />
//           </div>
//         }
//       />

//       {/* Protected Routes for Normal Users */}
//       <Route
//         element={
//           currentUser ? (
//             <ProtectedLayout user={currentUser} onLogout={handleLogout} />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       >
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/pending" element={<PendingPage />} />
//         <Route path="/complete" element={<CompletePage />} />
//         <Route
//           path="/profile"
//           element={
//             <Profile
//               user={currentUser}
//               setCurrentUser={setCurrentUser}
//               onLogout={handleLogout}
//             />
//           }
//         />
//       </Route>

//       {/* Admin Route */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           currentUser?.role === "admin" ? (
//             <AdminDashboard />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Catch-All */}
//       <Route
//         path="*"
//         element={<Navigate to={currentUser ? "/" : "/login"} replace />}
//       />
//     </Routes>
//   );
// }





// ---------------------------------------


// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
// import Layout from "./components/Layout.jsx";
// import Profile from "./components/Profile.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import PendingPage from "./pages/PendingPage.jsx";
// import CompletePage from "./pages/CompletePage.jsx";
// import Login from "./components/Login.jsx";
// import SignUp from "./components/SignUp.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import API from "./api.js";
// import ForgotPassword from "./components/ForgotPassword.jsx";
// import ResetPassword from "./pages/ResetPassword.jsx"; // 🆕 Added


// // ✅ Ensure Axios uses correct baseURL
// API.defaults.baseURL = "https://server-tflow.onrender.com/api";

// function ProtectedLayout({ onLogout, user }) {
//   return (
//     <Layout user={user} onLogout={onLogout}>
//       <Outlet />
//     </Layout>
//   );
// }

// export default function App() {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     if (storedUser) setCurrentUser(JSON.parse(storedUser));
//   }, []);

//   // ✅ This now only handles final login/signup success
//   const handleAuthSubmit = async (data) => {
//     if (!data.user) return;
//     localStorage.setItem("currentUser", JSON.stringify(data.user));
//     setCurrentUser(data.user);

//     if (data.user.role === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     navigate("/login");
//   };

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route
//         path="/login"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <Login
//               onSubmit={handleAuthSubmit} // ✅ Receives final login data
//               onSwitchMode={() => navigate("/signup")}
//             />
//           </div>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <SignUp
//               onSubmit={handleAuthSubmit}
//               onSwitchMode={() => navigate("/login")}
//             />
//           </div>
//         }
//       />

//       {/* Protected Routes for Normal Users */}
//       <Route
//         element={
//           currentUser ? (
//             <ProtectedLayout user={currentUser} onLogout={handleLogout} />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       >
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/pending" element={<PendingPage />} />
//         <Route path="/complete" element={<CompletePage />} />
//         <Route
//           path="/profile"
//           element={
//             <Profile
//               user={currentUser}
//               setCurrentUser={setCurrentUser}
//               onLogout={handleLogout}
//             />
//           }
//         />
//       </Route>

//       {/* Admin Route */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           currentUser?.role === "admin" ? (
//             <AdminDashboard />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Catch-All */}
//       <Route
//         path="*"
//         element={<Navigate to={currentUser ? "/" : "/login"} replace />}
//       />
//     </Routes>
//   );
// }






// --------------------------------------------------------------------------


// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PendingPage from "./pages/PendingPage.jsx";
import CompletePage from "./pages/CompletePage.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx"; // 🆕 Added
import API from "./api.js";

// ✅ Ensure Axios uses correct baseURL
API.defaults.baseURL = "https://server-tflow.onrender.com/api";

// ✅ Protected Layout for authenticated users
function ProtectedLayout({ onLogout, user }) {
  return (
    <Layout user={user} onLogout={onLogout}>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Restore logged-in user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // ✅ Handle Login / Signup success
  const handleAuthSubmit = (data) => {
    if (!data?.user) return;
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    setCurrentUser(data.user);

    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      {/* ---------------- Public Routes ---------------- */}
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/signup")}
            />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SignUp
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/login")}
            />
          </div>
        }
      />

      {/* 🆕 Forgot + Reset Password Routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ---------------- Protected Routes (User) ---------------- */}
      <Route
        element={
          currentUser ? (
            <ProtectedLayout user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/pending" element={<PendingPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route
          path="/profile"
          element={
            <Profile
              user={currentUser}
              setCurrentUser={setCurrentUser}
              onLogout={handleLogout}
            />
          }
        />
      </Route>

      {/* ---------------- Admin Route ---------------- */}
      <Route
        path="/admin/dashboard"
        element={
          currentUser?.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ---------------- Catch-All ---------------- */}
      <Route
        path="*"
        element={<Navigate to={currentUser ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}
