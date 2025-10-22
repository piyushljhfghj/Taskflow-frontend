

// // src/components/OtpVerification.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const OtpVerification = ({ email, onVerified }) => {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
//       // data should contain token and user._id
//       onVerified({ token: data.token, userId: data.user._id, email });

//       // ✅ Added: redirect based on user role
//       const user = data.user;
//       if (user?.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
//       <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
//       <p className="text-center text-gray-600 mb-4">
//         Enter the OTP sent to <strong>{email}</strong>
//       </p>
//       {message && <p className="text-center text-red-600 mb-2">{message}</p>}
//       <form onSubmit={handleVerify} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 rounded-lg"
//         >
//           {loading ? "Verifying..." : "Verify OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OtpVerification;




// -------------------------------------------------------







// src/components/OtpVerification.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://server-tflow.onrender.com";

const OtpVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
      // data should contain token and user._id
      onVerified({ token: data.token, userId: data.user._id, email });

      // ✅ Added: redirect based on user role
      const user = data.user;
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setMessage(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-purple-100">
      <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
      <p className="text-center text-gray-600 mb-4">
        Enter the OTP sent to <strong>{email}</strong>
      </p>
      {message && <p className="text-center text-red-600 mb-2">{message}</p>}
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
