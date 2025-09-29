
// // SignUp.jsx (add at the top) 
// // google sign up ka button
// // -------------------------------------------------

// import { auth, googleProvider } from "../firebase"
// import { signInWithPopup } from "firebase/auth"
// import { FcGoogle } from "react-icons/fc"

// // inside SignUp component
// const handleGoogleSignUp = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;
//     const token = await user.getIdToken();

//     localStorage.setItem("token", token);
//     localStorage.setItem("userId", user.uid);

//     onSubmit?.({
//       token,
//       userId: user.uid,
//       email: user.email,
//       name: user.displayName,
//       avatar: user.photoURL,
//     });

//     setMessage({
//       text: "Signed up with Google! Redirecting...",
//       type: "success",
//     });
//   } catch (error) {
//     setMessage({ text: error.message, type: "error" });
//   }
// };


// // --------------------------------------------------

// // / SignUp.jsx taskflow ka 
// import { UserPlus, Mail, Lock, User } from "lucide-react"
// import React, { useState } from "react"
// import axios from "axios"
// import { Inputwrapper } from "../assets/dummy"
// import API from "../api";

// const INITIAL_FORM = { name: "", email: "", password: "" }

// const SignUp = ({ onSwitchMode, onSubmit }) => {
//   const [formData, setFormData] = useState(INITIAL_FORM)
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState({ text: "", type: "" })

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage({ text: "", type: "" })

//     try {
//       const { data } = await axios.post(
//         `${API_URL}/api/user/register`,
//         formData
//       )

//       console.log("SignUp successful:", data)

//       // ✅ if backend returns token, save it
//       if (data.token) {
//         localStorage.setItem("token", data.token)
//         localStorage.setItem("userId", data.user.id)
//         onSubmit?.({ token: data.token, userId: data.user.id, ...data.user })
//         setMessage({
//           text: "Registration successful! Redirecting...",
//           type: "success",
//         })
//       } else {
//         setMessage({
//           text: "Registration successful! Please log in.",
//           type: "success",
//         })
//         onSwitchMode?.()
//       }

//       setFormData(INITIAL_FORM)
//     } catch (err) {
//       console.error("SignUp error:", err)
//       setMessage({
//         text:
//           err.response?.data?.message || "An error occurred. Please try again.",
//         type: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

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

//         <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors" disabled={loading}>
//           {loading ? (
//             "Signing Up..."
//           ) : (
//             <>
//               <UserPlus className="w-4 h-4" /> Sign Up
//             </>
//           )}
//         </button>
//       </form>

//  {/* ---------------------------------------------- */}


// {/* 👉 Google SignUp Button */}
// <div className="mt-4">
//   <button
//     onClick={handleGoogleSignUp}
//     type="button"
//     className="w-full border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//   >
//     <FcGoogle className="w-5 h-5" />
//     <span className="text-sm font-medium text-gray-700">
//       Sign Up with Google
//     </span>
//   </button>
// </div>


//  {/* ---------------------------------------------------------- */}


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
//   )
// }

// export default SignUp


// src/components/SignUp.jsx
import { useState } from "react";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import OTPVerification from "./OTPVerification";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const SignUp = ({ onSwitchMode, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [otpEmail, setOtpEmail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/user/register`, formData);
      setOtpEmail(data.email); // redirect to OTP
    } catch (err) {
      alert(err.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post(`${API_URL}/api/auth/google`, { token: idToken });
      localStorage.setItem("token", res.data.token);
      onSubmit?.({ token: res.data.token, userId: res.data.user.id, ...res.data.user });
    } catch (err) {
      console.error(err);
      alert("Google signup failed!");
    }
  };

  if (otpEmail)
    return <OTPVerification email={otpEmail} onVerified={() => onSubmit({ token: localStorage.getItem("token"), email: otpEmail })} />;

  return (
    <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password"].map((field) => (
          <div key={field} className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            {field === "name" && <User className="text-purple-500 w-5 h-5 mr-2" />}
            {field === "email" && <Mail className="text-purple-500 w-5 h-5 mr-2" />}
            {field === "password" && <Lock className="text-purple-500 w-5 h-5 mr-2" />}
            <input
              type={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="w-full focus:outline-none"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-4">
        <button onClick={handleGoogleSignUp} className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2">
          <FcGoogle /> Sign Up with Google
        </button>
      </div>
      <p className="text-center mt-4">
        Already have an account? <button onClick={onSwitchMode} className="text-purple-600">Login</button>
      </p>
    </div>
  );
};

export default SignUp;
