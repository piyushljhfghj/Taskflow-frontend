

// // src/components/ForgotPassword.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "https://taskflow-frontend-nine.vercel.app";

// const ForgotPassword = ({ onOtpSent }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_URL}/api/auth/send-otp`, { email });
//       setMessage("OTP sent to your Gmail!");
//       onOtpSent(email);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
//       <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
//       {message && <p className="text-center text-red-600 mb-2">{message}</p>}
//       <form onSubmit={handleSendOtp} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter your Gmail"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-purple-600 text-white py-2 rounded-lg"
//         >
//           {loading ? "Sending OTP..." : "Send OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;



// -------------------------------------------------





// // src/components/ForgotPassword.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "https://taskflow-frontend-nine.vercel.app";

// const ForgotPassword = ({ onOtpSent }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post(`${API_URL}/api/auth/send-otp`, { email });
//       setMessage("OTP sent to your Gmail!");
//       onOtpSent(email);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
//       <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
//       {message && <p className="text-center text-red-600 mb-2">{message}</p>}
//       <form onSubmit={handleSendOtp} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Enter your Gmail"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-purple-600 text-white py-2 rounded-lg"
//         >
//           {loading ? "Sending OTP..." : "Send OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;






// -----------------------------------------------


// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter your email.");

    try {
      setLoading(true);
      setMessage("");
      const { data } = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setMessage(data.msg || "OTP sent successfully to your Gmail.");
      
      // 🕒 Automatically go to reset-password page after OTP sent
      setTimeout(() => navigate("/reset-password"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your registered Gmail. We’ll send a 6-digit OTP to reset your password.
        </p>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full border border-purple-600 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
