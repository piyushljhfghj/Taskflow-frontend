

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
// import Layout from "./components/Layout.jsx";
// import Profile from "./components/Profile";
// import Dashboard from "./pages/Dashboard";
// import Login from "./components/Login.jsx";
// import SignUp from "./components/SignUp.jsx";
// import PendingPage from "./pages/PendingPage";
// import CompletePage from "./pages/CompletePage";
// import "./index.css";

// const App = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(() => {
//     const stored = localStorage.getItem("currentUser");
//     return stored ? JSON.parse(stored) : null;
//   });

//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [currentUser]);

//   const handleAuthSubmit = (data) => {
//     setCurrentUser(data);
//     localStorage.setItem("currentUser", JSON.stringify(data));
//     navigate("/", { replace: true });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     navigate("/login", { replace: true });
//   };

//   const ProtectedLayout = () => (
//     <Layout user={currentUser} onLogout={handleLogout}>
//       <Outlet />
//     </Layout>
//   );

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <Login onSubmit={handleAuthSubmit} onSwitchMode={() => navigate("/signup")} />
//           </div>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <SignUp onSubmit={handleAuthSubmit} onSwitchMode={() => navigate("/login")} />
//           </div>
//         }
//       />

//       <Route element={currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />}>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/pending" element={<PendingPage />} />
//         <Route path="/complete" element={<CompletePage />} />
//         <Route
//           path="/profile"
//           element={<Profile user={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />}
//         />
//       </Route>

//       <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
//     </Routes>
//   );
// };

// export default App;


// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PendingPage from "./pages/PendingPage.jsx";
import CompletePage from "./pages/CompletePage.jsx";
import Profile from "./components/Profile.jsx";

import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import OtpVerification from "./components/OtpVerification.jsx";

import "./index.css";

const App = () => {
  const navigate = useNavigate();

  // currentUser stores all user info + token
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  // OTP state for email/password flows
  const [pendingOtp, setPendingOtp] = useState(null);

  // Save currentUser in localStorage for persistent login
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleAuthSubmit = (data) => {
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
    setPendingOtp(null); // OTP completed
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setPendingOtp(null);
    navigate("/login", { replace: true });
  };

  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          pendingOtp ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <OTPVerification
                email={pendingOtp}
                onVerified={() =>
                  handleAuthSubmit({
                    token: localStorage.getItem("token"),
                    email: pendingOtp,
                  })
                }
              />
            </div>
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Login
                onSubmit={(data) => handleAuthSubmit(data)}
                onSwitchMode={() => navigate("/signup")}
              />
            </div>
          )
        }
      />

      {/* SignUp Page */}
      <Route
        path="/signup"
        element={
          pendingOtp ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <OTPVerification
                email={pendingOtp}
                onVerified={() =>
                  handleAuthSubmit({
                    token: localStorage.getItem("token"),
                    email: pendingOtp,
                  })
                }
              />
            </div>
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <SignUp
                onSubmit={(data) => handleAuthSubmit(data)}
                onSwitchMode={() => navigate("/login")}
              />
            </div>
          )
        }
      />

      {/* Protected Routes */}
      <Route element={currentUser ? <ProtectedLayout /> : <Navigate to="/login" replace />}>
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

      {/* Catch all */}
      <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
    </Routes>
  );
};

export default App;
