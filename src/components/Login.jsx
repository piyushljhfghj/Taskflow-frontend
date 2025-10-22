
// // yeh hai google authentication ka code/

// // Login.jsx (add at the top)
// // Login.jsx
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";
// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";

// // ✅ define API URL once
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const handleGoogleLogin = async () => {
//   try {
//     // 1. Sign in with Google
//     const result = await signInWithPopup(auth, googleProvider);

//     // 2. Get Firebase ID token
//     const idToken = await result.user.getIdToken();

//     // 3. Send token to backend
//     const res = await axios.post(`${API_URL}/api/auth/google`, {
//       token: idToken,
//     });

//     // 4. Save your backend JWT
//     localStorage.setItem("token", res.data.token);

//     alert("Google login successful!");
//     // redirect to dashboard, etc.
//   } catch (error) {
//     console.error("Google login error:", error);
//     alert("Login failed!");
//   }
// };


// // --------------------------------------------------------


// // Login.jsx yeh hai task flow ka code 
// import { useState, useEffect } from "react"
// import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// import { INPUTWRAPPER, BUTTON_CLASSES } from "../assets/dummy"

// const INITIAL_FORM = { email: "", password: "" }

// const Login = ({ onSubmit, onSwitchMode }) => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState(INITIAL_FORM)
//   const [rememberMe, setRememberMe] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   // const url = "http://localhost:4000"
//   const url = "https://server-tflow.onrender.com"



//   // Auto-login
//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     const userId = localStorage.getItem("userId")
//     if (token) {
//       (async () => {
//         try {
//           const { data } = await axios.get(`${url}/api/user/me`, {
//             headers: { Authorization: `Bearer ${token}` },
//           })
//           if (data.success) {
//             onSubmit?.({ token, userId, ...data.user })
//             toast.success("Session restored. Redirecting...")
//             navigate("/")
//           } else {
//             localStorage.clear()
//           }
//         } catch {
//           localStorage.clear()
//         }
//       })()
//     }
//   }, [navigate, onSubmit])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!rememberMe) {
//       toast.error('You must enable "Remember Me" to login.')
//       return
//     }

//     setLoading(true)
//     try {
//       const { data } = await axios.post(`${url}/api/user/login`, formData)
//       if (!data.token) throw new Error(data.message || "Login failed.")

//       localStorage.setItem("token", data.token)
//       localStorage.setItem("userId", data.user.id)
//       setFormData(INITIAL_FORM)
//       onSubmit?.({ token: data.token, userId: data.user.id, ...data.user })
//       toast.success("Login successful! Redirecting...")
//       setTimeout(() => navigate("/"), 1000)
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message
//       toast.error(msg)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <LogIn className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Sign in to continue to TaskFlow
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* email */}
//         <div className={INPUTWRAPPER}>
//           <Mail className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>

//         {/* password */}
//         <div className={INPUTWRAPPER}>
//           <Lock className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="ml-2 text-gray-500 hover:text-purple-500 transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5" />
//             ) : (
//               <Eye className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {/* remember me */}
//         <div className="flex items-center">
//           <input
//             id="rememberMe"
//             type="checkbox"
//             checked={rememberMe}
//             onChange={() => setRememberMe(!rememberMe)}
//             className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-300 rounded"
//             required
//           />
//           <label
//             htmlFor="rememberMe"
//             className="ml-2 block text-sm text-gray-700"
//           >
//             Remember Me
//           </label>
//         </div>

//         <button type="submit" className={BUTTON_CLASSES} disabled={loading}>
//           {loading ? (
//             "Logging in..."
//           ) : (
//             <>
//               <LogIn className="w-4 h-4" /> Login
//             </>
//           )}
//         </button>
//       </form>


// {/* ---------------------------------------------- */}
    
    
//       {/* 👉 Google Login Button */}

// <div className="mt-4">
//   <button
//     onClick={handleGoogleLogin}
//     type="button"
//     className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//   >
//     <FcGoogle className="w-5 h-5" />
//     <span className="text-sm font-medium text-gray-700">
//       Continue with Google
//     </span>
//   </button>
// </div>

// // {/* ------------------------------------------------- */}

// //       <p className="text-center text-sm text-gray-600 mt-6">
// //         Don't have an account?{" "}
// //         <button
//           type="button"
//           onClick={onSwitchMode}
//           className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   )
// }

// export default Login;



// -------------------------------------------------------------------------



// // src/components/Login.jsx
// import { useState } from "react";
// import { Mail, Key, LogIn } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { INPUTWRAPPER, BUTTON_CLASSES } from "../assets/dummy";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const Login = ({ onSubmit, onSwitchMode }) => {
//   const [formData, setFormData] = useState({ email: "" });
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();

//   // -------------------------------
//   // Send OTP for login
//   // -------------------------------
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/signup/send-otp`, {
//         email: formData.email,
//         name: "User",
//       });
//       if (data.msg.includes("already exists") || data.msg.includes("OTP sent")) {
//         setOtpSent(true);
//         setMessage({ text: "OTP sent to your email", type: "success" });
//       } else {
//         setMessage({ text: data.msg, type: "error" });
//       }
//     } catch (err) {
//       const msg = err.response?.data?.msg || "Failed to send OTP";
//       setMessage({ text: msg, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------
//   // Verify OTP
//   // -------------------------------
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, {
//         email: formData.email,
//         otp,
//       });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user._id);
//       onSubmit?.(data);
//       setMessage({ text: "Login successful! Redirecting...", type: "success" });
//       setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       const msg = err.response?.data?.msg || "Invalid OTP";
//       setMessage({ text: msg, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------
//   // Google Login
//   // -------------------------------
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const firebaseToken = await result.user.getIdToken();

//       const { data } = await axios.post(`${API_URL}/api/auth/google`, {
//         token: firebaseToken,
//       });

//       if (data.message?.includes("already exists")) {
//         // login case, issue JWT
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("userId", data.user._id);
//         onSubmit?.(data);
//         setMessage({ text: "Welcome back! Redirecting...", type: "success" });
//         setTimeout(() => navigate("/"), 1000);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user._id);
//       onSubmit?.(data);
//       setMessage({ text: "Google login successful!", type: "success" });
//       setTimeout(() => navigate("/"), 1000);
//     } catch (error) {
//       const msg = error.response?.data?.message || error.message;
//       setMessage({ text: msg, type: "error" });
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <LogIn className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
//       </div>

//       {message.text && (
//         <div
//           className={`${
//             message.type === "success"
//               ? "text-green-600 bg-green-100"
//               : "text-red-600 bg-red-100"
//           } border p-2 rounded mb-4 text-sm`}
//         >
//           {message.text}
//         </div>
//       )}

//       {!otpSent ? (
//         <form onSubmit={handleSendOtp} className="space-y-4">
//           <div className={INPUTWRAPPER}>
//             <Mail className="text-purple-500 w-5 h-5 mr-2" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) => setFormData({ email: e.target.value })}
//               className="w-full focus:outline-none text-sm text-gray-700"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={BUTTON_CLASSES}
//             disabled={loading}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <div className={INPUTWRAPPER}>
//             <Key className="text-purple-500 w-5 h-5 mr-2" />
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full focus:outline-none text-sm text-gray-700"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-lg"
//             disabled={loading}
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//       )}

//       {/* Google Login */}
//       <div className="mt-4">
//         <button
//           onClick={handleGoogleLogin}
//           type="button"
//           className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//         >
//           <FcGoogle className="w-5 h-5" />
//           <span className="text-sm font-medium text-gray-700">
//             Continue with Google
//           </span>
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-6">
//         Don't have an account?{" "}
//         <button
//           onClick={onSwitchMode}
//           className="text-purple-600 hover:underline"
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;




// ----
// import React, { useState } from "react";
// import { Mail, Lock, LogIn } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const Login = ({ onSubmit, onOtpFlow }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();

//   // Gmail + Password login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

//       if (data.requiresOtp) {
//         onOtpFlow(formData.email);
//       } else {
//         onSubmit?.(data);
//         localStorage.setItem("token", data.token);

//         // Redirect based on role
//         const user = data.user;
//         if (user?.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/dashboard");
//         }

//         setMessage({ text: "Login successful!", type: "success" });
//       }
//     } catch (err) {
//       const status = err.response?.status;
//       if (status === 404) {
//         // User not found → redirect to signup
//         setMessage({ text: "User not found. Please sign up first.", type: "error" });
//         setTimeout(() => navigate("/signup"), 1500);
//       } else if (status === 401) {
//         // Wrong password
//         setMessage({ text: "Wrong password. Try again.", type: "error" });
//       } else {
//         setMessage({ text: "Login failed. Try again.", type: "error" });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const firebaseToken = await result.user.getIdToken();
//       const { data } = await axios.post(`${API_URL}/api/auth/login/google`, { token: firebaseToken });

//       onSubmit?.(data);
//       localStorage.setItem("token", data.token);

//       // Redirect based on role
//       const user = data.user;
//       if (user?.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/dashboard");
//       }

//       setMessage({ text: "Google login successful!", type: "success" });
//     } catch (err) {
//       const msg = err.response?.data?.msg || err.message;
//       setMessage({ text: msg, type: "error" });
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <LogIn className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
//       </div>

//       {message.text && (
//         <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
//           {message.text}
//         </p>
//       )}

//       <form onSubmit={handleLogin} className="space-y-4">
//         <div className="flex items-center border rounded-lg px-3 py-2">
//           <Mail className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>

//         <div className="flex items-center border rounded-lg px-3 py-2">
//           <Lock className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>

//         <div className="flex justify-between items-center text-sm">
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-password")}
//             className="text-purple-600 hover:underline"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded-lg"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <div className="mt-4">
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
//         >
//           <FcGoogle className="w-5 h-5" />
//           <span className="text-sm text-gray-700">Continue with Google</span>
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-6">
//         Don't have an account?{" "}
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="text-purple-600 hover:underline"
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;










import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com";

const Login = ({ onSubmit, onOtpFlow }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Gmail + Password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

      if (data.requiresOtp) {
        onOtpFlow(formData.email);
      } else {
        onSubmit?.(data);
        localStorage.setItem("token", data.token);

        // Redirect based on role
        const user = data.user;
        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }

        setMessage({ text: "Login successful!", type: "success" });
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        // User not found → redirect to signup
        setMessage({ text: "User not found. Please sign up first.", type: "error" });
        setTimeout(() => navigate("/signup"), 1500);
      } else if (status === 401) {
        // Wrong password
        setMessage({ text: "Wrong password. Try again.", type: "error" });
      } else {
        setMessage({ text: "Login failed. Try again.", type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();
      const { data } = await axios.post(`${API_URL}/auth/login/google`, { token: firebaseToken });

      onSubmit?.(data);
      localStorage.setItem("token", data.token);

      const user = data.user;
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

      setMessage({ text: "Google login successful!", type: "success" });
    } catch (err) {
      const msg = err.response?.data?.msg || err.message;
      setMessage({ text: msg, type: "error" });
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
      </div>

      {message.text && (
        <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex items-center border rounded-lg px-3 py-2">
          <Mail className="text-purple-500 w-5 h-5 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full focus:outline-none text-sm text-gray-700"
            required
          />
        </div>

        <div className="flex items-center border rounded-lg px-3 py-2">
          <Lock className="text-purple-500 w-5 h-5 mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full focus:outline-none text-sm text-gray-700"
            required
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-purple-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm text-gray-700">Continue with Google</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-purple-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
   










// ------------------------------------------------------------------







// import React, { useState } from "react";
// import { Mail, Lock, LogIn } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const Login = ({ onSubmit, onOtpFlow }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const navigate = useNavigate();

//   // Gmail + Password login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/login`, formData);

//       if (data.requiresOtp) {
//         onOtpFlow(formData.email);
//       } else {
//         onSubmit?.(data);
//         localStorage.setItem("token", data.token);

//         // Redirect based on role
//         const user = data.user;
//         if (user?.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/dashboard");
//         }

//         setMessage({ text: "Login successful!", type: "success" });
//       }
//     } catch (err) {
//       const status = err.response?.status;
//       if (status === 404) {
//         // User not found → redirect to signup
//         setMessage({ text: "User not found. Please sign up first.", type: "error" });
//         setTimeout(() => navigate("/signup"), 1500);
//       } else if (status === 401) {
//         // Wrong password
//         setMessage({ text: "Wrong password. Try again.", type: "error" });
//       } else {
//         setMessage({ text: "Login failed. Try again.", type: "error" });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Google login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const firebaseToken = await result.user.getIdToken();
//       const { data } = await axios.post(`${API_URL}/auth/login/google`, { token: firebaseToken });

//       onSubmit?.(data);
//       localStorage.setItem("token", data.token);

//       const user = data.user;
//       if (user?.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/dashboard");
//       }

//       setMessage({ text: "Google login successful!", type: "success" });
//     } catch (err) {
//       const msg = err.response?.data?.msg || err.message;
//       setMessage({ text: msg, type: "error" });
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <LogIn className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
//         <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
//       </div>

//       {message.text && (
//         <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
//           {message.text}
//         </p>
//       )}

//       <form onSubmit={handleLogin} className="space-y-4">
//         <div className="flex items-center border rounded-lg px-3 py-2">
//           <Mail className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>

//         <div className="flex items-center border rounded-lg px-3 py-2">
//           <Lock className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>

//         <div className="flex justify-between items-center text-sm">
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-password")}
//             className="text-purple-600 hover:underline"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded-lg"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <div className="mt-4">
//         <button
//           type="button"
//           onClick={handleGoogleLogin}
//           className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
//         >
//           <FcGoogle className="w-5 h-5" />
//           <span className="text-sm text-gray-700">Continue with Google</span>
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-6">
//         Don't have an account?{" "}
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="text-purple-600 hover:underline"
//         >
//           Sign Up
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;
   











