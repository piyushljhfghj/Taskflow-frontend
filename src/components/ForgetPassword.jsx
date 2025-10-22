

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





// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://taskflow-frontend-nine.vercel.app";

const ForgotPassword = ({ onOtpSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/send-otp`, { email });
      setMessage("OTP sent to your Gmail!");
      onOtpSent(email);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      {message && <p className="text-center text-red-600 mb-2">{message}</p>}
      <form onSubmit={handleSendOtp} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
