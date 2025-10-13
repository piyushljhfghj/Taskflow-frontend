// // SignUp.jsx
// import React, { useState } from "react";
// import { UserPlus, Mail, Lock, User } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { Inputwrapper } from "../assets/dummy";

// const API_URL = "http://localhost:4000"; // backend

// const INITIAL_FORM = { name: "", email: "", password: "" };

// const SignUp = ({ onSwitchMode, onSubmit }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // -------------------------------
//   // Normal Signup
//   // -------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const { data } = await axios.post(
//         `${API_URL}/api/user/register`,
//         formData
//       );

//       if (data.token) {
//         // ✅ Store backend-issued JWT
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("userId", data.user.id);

//         onSubmit?.({ token: data.token, userId: data.user.id, ...data.user });
//         setMessage({
//           text: "Registration successful! Redirecting...",
//           type: "success",
//         });
//       } else {
//         setMessage({
//           text: "Registration successful! Please log in.",
//           type: "success",
//         });
//         onSwitchMode?.();
//       }

//       setFormData(INITIAL_FORM);
//     } catch (err) {
//       console.error("SignUp error:", err);
//       setMessage({
//         text:
//           err.response?.data?.message || "An error occurred. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------
//   // Google Signup (FIXED)
//   // -------------------------------
//   const handleGoogleSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const firebaseToken = await user.getIdToken();

//       // 👉 Send Firebase token to backend for verification
//       const { data } = await axios.post(`${API_URL}/api/auth/google`, {
//         token: firebaseToken,
//       });

//       // ✅ Store backend-issued JWT (not Firebase token)
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user.id);

//       // ✅ Notify parent with backend user data
//       onSubmit?.({ token: data.token, userId: data.user.id, ...data.user });

//       setMessage({
//         text: "Signed up with Google! Redirecting...",
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Google SignUp error:", error);
//       setMessage({ text: error.response?.data?.message || error.message, type: "error" });
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <UserPlus className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Join TaskFlow to manage your tasks
//         </p>
//       </div>

//       {message.text && (
//         <div
//           className={
//             message.type === "success"
//               ? "text-green-600 bg-green-100 border border-green-200 p-2 rounded mb-4 text-sm"
//               : "text-red-600 bg-red-100 border border-red-200 p-2 rounded mb-4 text-sm"
//           }
//         >
//           {message.text}
//         </div>
//       )}

//       {/* Normal Signup Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { name: "name", type: "text", placeholder: "Full Name", icon: User },
//           {
//             name: "email",
//             type: "email",
//             placeholder: "Email Address",
//             icon: Mail,
//           },
//           {
//             name: "password",
//             type: "password",
//             placeholder: "Password",
//             icon: Lock,
//           },
//         ].map(({ name, type, placeholder, icon: Icon }) => (
//           <div key={name} className={Inputwrapper}>
//             <Icon className="text-purple-500 w-5 h-5 mr-2" />
//             <input
//               type={type}
//               placeholder={placeholder}
//               value={formData[name]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [name]: e.target.value })
//               }
//               className="w-full focus:outline-none text-sm text-gray-700"
//               required
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
//           disabled={loading}
//         >
//           {loading ? (
//             "Signing Up..."
//           ) : (
//             <>
//               <UserPlus className="w-4 h-4" /> Sign Up
//             </>
//           )}
//         </button>
//       </form>

//       {/* Google SignUp Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleGoogleSignUp}
//           type="button"
//           className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//         >
//           <FcGoogle className="w-5 h-5" />
//           <span className="text-sm font-medium text-gray-700">
//             Sign Up with Google
//           </span>
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-6">
//         Already have an account?{" "}
//         <button
//           onClick={onSwitchMode}
//           className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
//         >
//           Login
//         </button>
//       </p>
//     </div>
//   );
// };

// export default SignUp;





// -------------------------------------------------------------------






// // SignUp.jsx
// import React, { useState } from "react";
// import { UserPlus, Mail, Lock, User } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import { Inputwrapper } from "../assets/dummy";

// const API_URL = "http://localhost:4000"; // backend
// const INITIAL_FORM = { name: "", email: "", password: "" };

// const SignUp = ({ onSwitchMode, onSubmit }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   // -------------------------------
//   // Normal Signup
//   // -------------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ text: "", type: "" });

//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/register`, formData);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("userId", data.user._id);

//         onSubmit?.({ token: data.token, userId: data.user._id, ...data.user });
//         setMessage({ text: "Registration successful! Redirecting...", type: "success" });
//         setFormData(INITIAL_FORM);
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || "An error occurred. Please try again.";
//       setMessage({ text: msg, type: "error" });

//       // Redirect to login if user already exists
//       if (msg.includes("already exists")) {
//         setTimeout(() => {
//           onSwitchMode?.(); // switch to login page
//         }, 2000);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------
//   // Google Signup
//   // -------------------------------
//   const handleGoogleSignUp = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const firebaseToken = await user.getIdToken();

//       const { data } = await axios.post(`${API_URL}/api/auth/google`, { token: firebaseToken });

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user._id);

//       onSubmit?.({ token: data.token, userId: data.user._id, ...data.user });
//       setMessage({ text: "Signed up with Google! Redirecting...", type: "success" });
//     } catch (error) {
//       const msg = error.response?.data?.message || error.message;
//       setMessage({ text: msg, type: "error" });

//       // Redirect to login if user already exists
//       if (msg.includes("already exists")) {
//         setTimeout(() => {
//           onSwitchMode?.();
//         }, 2000);
//       }
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//       <div className="mb-6 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
//           <UserPlus className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
//         <p className="text-gray-500 text-sm mt-1">
//           Join TaskFlow to manage your tasks
//         </p>
//       </div>

//       {message.text && (
//         <div
//           className={
//             message.type === "success"
//               ? "text-green-600 bg-green-100 border border-green-200 p-2 rounded mb-4 text-sm"
//               : "text-red-600 bg-red-100 border border-red-200 p-2 rounded mb-4 text-sm"
//           }
//         >
//           {message.text}
//         </div>
//       )}

//       {/* Normal Signup Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { name: "name", type: "text", placeholder: "Full Name", icon: User },
//           { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
//           { name: "password", type: "password", placeholder: "Password", icon: Lock },
//         ].map(({ name, type, placeholder, icon: Icon }) => (
//           <div key={name} className={Inputwrapper}>
//             <Icon className="text-purple-500 w-5 h-5 mr-2" />
//             <input
//               type={type}
//               placeholder={placeholder}
//               value={formData[name]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [name]: e.target.value })
//               }
//               className="w-full focus:outline-none text-sm text-gray-700"
//               required
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
//           disabled={loading}
//         >
//           {loading ? "Signing Up..." : (<><UserPlus className="w-4 h-4" /> Sign Up</>)}
//         </button>
//       </form>

//       {/* Google SignUp Button */}
//       <div className="mt-4">
//         <button
//           onClick={handleGoogleSignUp}
//           type="button"
//           className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//         >
//           <FcGoogle className="w-5 h-5" />
//           <span className="text-sm font-medium text-gray-700">Sign Up with Google</span>
//         </button>
//       </div>

//       <p className="text-center text-sm text-gray-600 mt-6">
//         Already have an account?{" "}
//         <button
//           onClick={onSwitchMode}
//           className="text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
//         >
//           Login
//         </button>
//       </p>
//     </div>
//   );
// };

// export default SignUp;


// ---------------------------------------------------------------------------------------------------


import React, { useState } from "react";
import { UserPlus, Mail, Lock, User, Key } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Inputwrapper } from "../assets/dummy";

const API_URL = "http://localhost:4000"; // backend

const INITIAL_FORM = { name: "", email: "", password: "" };

const SignUp = ({ onSwitchMode, onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // -------------------------------
  // Send OTP
  // -------------------------------
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/signup/send-otp`, formData);
      setOtpSent(true);
      setMessage({ text: data.msg, type: "success" });
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to send OTP";
      setMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Verify OTP
  // -------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/signup/verify-otp`, { email: formData.email, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      onSubmit?.(data);
      setMessage({ text: "Signup successful!", type: "success" });
      setFormData(INITIAL_FORM);
      setOtp("");
    } catch (err) {
      const msg = err.response?.data?.msg || "Invalid OTP";
      setMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Google Signup
  // -------------------------------
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      const { data } = await axios.post(`${API_URL}/api/auth/google`, { token: firebaseToken });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      onSubmit?.(data);
      setMessage({ text: "Signed up with Google!", type: "success" });
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setMessage({ text: msg, type: "error" });
    }
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Join TaskFlow to manage your tasks</p>
      </div>

      {message.text && (
        <div className={`${message.type === "success" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} border p-2 rounded mb-4 text-sm`}>
          {message.text}
        </div>
      )}

      {/* Signup Form */}
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          {[ 
            { name: "name", type: "text", placeholder: "Full Name", icon: User },
            { name: "email", type: "email", placeholder: "Email Address", icon: Mail },
            { name: "password", type: "password", placeholder: "Password", icon: Lock },
          ].map(({ name, type, placeholder, icon: Icon }) => (
            <div key={name} className={Inputwrapper}>
              <Icon className="text-purple-500 w-5 h-5 mr-2" />
              <input
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                className="w-full focus:outline-none text-sm text-gray-700"
                required
              />
            </div>
          ))}

          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className={Inputwrapper}>
            <Key className="text-purple-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full focus:outline-none text-sm text-gray-700"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* Google Signup */}
      <div className="mt-4">
        <button onClick={handleGoogleSignUp} type="button" className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">Sign Up with Google</span>
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button onClick={onSwitchMode} className="text-purple-600 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;


