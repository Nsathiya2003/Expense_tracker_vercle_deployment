// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useResetPassword } from "../api/users/user-hooks";

// export default function ResetPassword() {
//   const [data, setData] = useState({
//     otp: "",
//     password: "",
//     confirm_password: "",
//     emailId: "",
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const { mutate, isPending } = useResetPassword();

//   const handleChange = (
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = event.target;
//     setData((prev) => ({
//       ...prev,
//       [name as keyof FormData]: value,
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const payload = {
//       emailId: data.emailId,
//       password: data.password,
//       otp: data.otp,
//     };
//     mutate(payload);
//   };
//   return (
//     <>
//       <div className="reset-container flex justify-center items-center min-h-screen">
//         <div className="bg-[#548f54] w-full max-w-md md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
//           <form
//             action="submit"
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-4 px-4 p-16 md:10 lg:18 sm-12"
//           >
//             <h1 className="text-white font-bold text-center text-xl">
//               RESET PASSWORD
//             </h1>
//             <input
//               type="text"
//               id="emailId"
//               name="emailId"
//               placeholder="Enter your emailId"
//               value={data.emailId}
//               onChange={handleChange}
//               className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />
//             <input
//               type="text"
//               id="otp"
//               name="otp"
//               placeholder="Enter 6 digits otp"
//               value={data.otp}
//               onChange={handleChange}
//               className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />
//             <div className="relative w-full">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 id="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="New password"
//                 className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//               />
//               {passwordVisible ? (
//                 <FaEyeSlash
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
//                 />
//               ) : (
//                 <FaEye
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
//                 />
//               )}
//             </div>
//             <div className="relative w-full">
//               <input
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 name="confirm_password"
//                 id="confirm_password"
//                 value={data.confirm_password}
//                 onChange={handleChange}
//                 placeholder="Confirm password"
//                 className="w-full p-3 pr-10 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//               />
//               {confirmPasswordVisible ? (
//                 <FaEyeSlash
//                   onClick={() =>
//                     setConfirmPasswordVisible(!confirmPasswordVisible)
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
//                 />
//               ) : (
//                 <FaEye
//                   onClick={() =>
//                     setConfirmPasswordVisible(!confirmPasswordVisible)
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 cursor-pointer"
//                 />
//               )}
//             </div>
//             <button
//               type="submit"
//               disabled={isPending}
//               className={`bg-[#2C2C2C] w-full h-11 rounded-full text-white font-semibold transition-all duration-300 flex justify-center items-center gap-2 ${
//                 isPending
//                   ? "opacity-60 cursor-not-allowed"
//                   : "hover:bg-[#5B3256]"
//               }`}
//             >
//               {isPending ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                     ></path>
//                   </svg>
//                   <span>Reset...</span>
//                 </>
//               ) : (
//                 "Reset Password"
//               )}
//             </button>{" "}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPassword } from "../api/users/user-hooks";
import ResetImage from "../assets/expense2.png"; // same image as login

export default function ResetPassword() {
  const [data, setData] = useState({
    emailId: "",
    otp: "",
    password: "",
    confirm_password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useResetPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!data.emailId.trim()) newErrors.emailId = "Email is required";
    if (!data.otp.trim()) newErrors.otp = "OTP is required";
    if (!data.password.trim()) newErrors.password = "Password is required";
    if (!data.confirm_password.trim())
      newErrors.confirm_password = "Confirm password is required";
    if (
      data.password &&
      data.confirm_password &&
      data.password !== data.confirm_password
    )
      newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    mutate({
      emailId: data.emailId,
      otp: data.otp,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#f4faf4] p-10">
          <img
            src={ResetImage}
            alt="Reset Password"
            className="w-full max-w-sm object-contain"
          />
          <h2 className="mt-6 text-xl font-semibold text-gray-800 text-center">
            Reset Your Password
          </h2>
          <div className="mt-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm max-w-sm">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Enter your email, OTP, and new password to reset your account
              password.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 sm:p-10 flex flex-col justify-center bg-[#f9fdf9]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="emailId"
                value={data.emailId}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full h-11 px-4 rounded-lg text-sm outline-none bg-white border ${
                  errors.emailId
                    ? "border-red-600 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#548f54]"
                }`}
              />
              {errors.emailId && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.emailId}
                </p>
              )}
            </div>

            {/* OTP */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                OTP <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="otp"
                value={data.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className={`w-full h-11 px-4 rounded-lg text-sm outline-none bg-white border ${
                  errors.otp
                    ? "border-red-600 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#548f54]"
                }`}
              />
              {errors.otp && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.otp}
                </p>
              )}
            </div>

            {/* NEW PASSWORD */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                New Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className={`w-full h-11 px-4 pr-10 rounded-lg text-sm outline-none bg-white border ${
                    errors.password
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-300 focus:ring-[#548f54]"
                  }`}
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirm_password"
                  value={data.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`w-full h-11 px-4 pr-10 rounded-lg text-sm outline-none bg-white border ${
                    errors.confirm_password
                      ? "border-red-600 focus:ring-red-400"
                      : "border-gray-300 focus:ring-[#548f54]"
                  }`}
                />
                <span
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirm_password && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full h-11 rounded-full text-white font-semibold transition-all ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#548f54] hover:bg-[#446f44]"
              }`}
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
