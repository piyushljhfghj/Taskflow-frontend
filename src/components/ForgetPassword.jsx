// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Mail } from "lucide-react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/send-otp`, {
//         email,
//       });
//       localStorage.setItem("otpEmail", email);
//       setMessage("OTP sent to your Gmail!");
//       setTimeout(() => navigate("/otp-verification"), 1000);
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8">
//       <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
//       <form onSubmit={handleSendOtp} className="space-y-4">
//         <div className="flex items-center border rounded-lg px-3 py-2">
//           <Mail className="text-purple-500 w-5 h-5 mr-2" />
//           <input
//             type="email"
//             placeholder="Enter your Gmail"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full focus:outline-none text-sm text-gray-700"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-purple-600 text-white py-2 rounded-lg"
//         >
//           {loading ? "Sending OTP..." : "Send OTP"}
//         </button>
//       </form>
//       {message && (
//         <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;



// src/components/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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
