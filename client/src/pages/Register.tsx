// import { useState } from "react";
// import type { FormData } from "../types/types";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import { useCreateUser } from "../api/users/user-hooks";

// export default function Register() {
//   const [data, setData] = useState<FormData>({
//     username: "",
//     mobileNumber: "",
//     emailId: "",
//     password: "",
//     lastName: "",
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const { mutate, isPending } = useCreateUser();

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

//     //call the user create mutation...
//     const payload = {
//       username: data?.username,
//       lastName: data?.lastName,
//       mobileNumber: data?.mobileNumber,
//       emailId: data?.emailId,
//       password: data?.password,
//     };

//     mutate(payload);
//     //set the values empty...
//     setData({
//       username: "",
//       mobileNumber: "",
//       emailId: "",
//       password: "",
//       lastName: "",
//     });
//   };

//   return (
//     <>
//       <div className="register-container flex justify-center items-center min-h-screen  px-4">
//         <div className="bg-[#548f54] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[400px] rounded-2xl shadow-lg">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-5 p-6 sm:p-10 md:p-12 lg:p-16"
//           >
//             <h1 className="text-center text-2xl font-bold text-white">
//               SIGN UP
//             </h1>
//             <p className="text-center text-gray-200 text-sm">
//               Already have an account?{" "}
//               <a
//                 href="/"
//                 className="text-blue-900 font-semibold hover:underline transition-all duration-400"
//               >
//                 Login
//               </a>
//             </p>

//             {/* Username */}
//             <input
//               type="text"
//               name="username"
//               id="username"
//               value={data.username}
//               onChange={handleChange}
//               placeholder="Enter your first name"
//               className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />

//             {/* Initial */}
//             <input
//               type="text"
//               name="lastName"
//               id="lastName"
//               value={data.lastName}
//               onChange={handleChange}
//               placeholder="Enter your last name"
//               className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />

//             {/* Mobile Number */}
//             <input
//               type="text"
//               name="mobileNumber"
//               id="mobileNumber"
//               value={data.mobileNumber}
//               onChange={handleChange}
//               placeholder="Enter your mobile number"
//               className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />

//             {/* Email ID */}
//             <input
//               type="email"
//               name="emailId"
//               id="emailId"
//               value={data.emailId}
//               onChange={handleChange}
//               placeholder="Enter your email ID"
//               className="w-full p-3 rounded-lg text-sm border border-gray-400 placeholder-gray-600"
//             />

//             {/* Password */}
//             <div className="relative w-full">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 id="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
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
//                   <span>Creating...</span>
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import type { FormData } from "../types/types";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useCreateUser } from "../api/users/user-hooks";

// import RegisterImage from "../assets/expense2.png";

// export default function Register() {
//   const [data, setData] = useState<FormData>({
//     username: "",
//     mobileNumber: "",
//     emailId: "",
//     password: "",
//     lastName: "",
//   });

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const { mutate, isPending } = useCreateUser();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     mutate({
//       username: data.username,
//       lastName: data.lastName,
//       mobileNumber: data.mobileNumber,
//       emailId: data.emailId,
//       password: data.password,
//     });

//     setData({
//       username: "",
//       mobileNumber: "",
//       emailId: "",
//       password: "",
//       lastName: "",
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
//         {/* LEFT SIDE IMAGE (WILL SHOW ON DESKTOP & TABLET) */}
//         <div className="hidden md:flex flex-col justify-center items-center bg-[#f4faf4] p-10">
//           <img
//             src={RegisterImage}
//             alt="Expense Tracker Illustration"
//             className="w-full max-w-sm object-contain"
//           />

//           <h2 className="mt-6 text-xl font-semibold text-gray-800 text-center">
//             Manage Your Expenses
//           </h2>

//           <p className="mt-2 text-sm text-gray-600 text-center leading-relaxed">
//             Track spending, manage budgets, and stay financially organized with
//             ease.
//           </p>
//         </div>

//         {/* RIGHT SIDE FORM */}
//         <div className="p-6 sm:p-10 flex flex-col justify-center">
//           <div className="mb-6 text-center">
//             <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Already have an account?{" "}
//               <a
//                 href="/"
//                 className="text-[#548f54] font-semibold hover:underline"
//               >
//                 Login
//               </a>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="username"
//               value={data.username}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#548f54] outline-none"
//               required
//             />

//             <input
//               type="text"
//               name="lastName"
//               value={data.lastName}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#548f54] outline-none"
//               required
//             />

//             <input
//               type="text"
//               name="mobileNumber"
//               value={data.mobileNumber}
//               onChange={handleChange}
//               placeholder="Mobile Number"
//               className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#548f54] outline-none"
//               required
//             />

//             <input
//               type="email"
//               name="emailId"
//               value={data.emailId}
//               onChange={handleChange}
//               placeholder="Email Address"
//               className="w-full h-11 px-4 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#548f54] outline-none"
//               required
//             />

//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 value={data.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full h-11 px-4 pr-10 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#548f54] outline-none"
//                 required
//               />

//               <span
//                 onClick={() => setPasswordVisible(!passwordVisible)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>

//             <button
//               type="submit"
//               disabled={isPending}
//               className={`w-full h-11 rounded-full text-white font-semibold transition-all ${
//                 isPending
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-[#548f54] hover:bg-[#446f44]"
//               }`}
//             >
//               {isPending ? "Creating..." : "Create Account"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import type { FormData } from "../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useCreateUser } from "../api/users/user-hooks";
import RegisterImage from "../assets/expense2.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Register() {
  const [data, setData] = useState<FormData>({
    username: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    lastName: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useCreateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));

    // remove error when user types
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const handlePhoneChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      mobileNumber: value,
    }));

    setErrors((prev) => ({
      ...prev,
      mobileNumber: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.username.trim()) newErrors.username = "First name is required";

    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!data.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";

    if (!data.emailId.trim()) newErrors.emailId = "Email is required";

    if (!data.password) newErrors.password = "Password is required";
    else if (strength < 4) newErrors.password = "Password is not strong enough";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({
      username: data.username,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      emailId: data.emailId,
      password: data.password,
    });
  };

  const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  };

  const strength = getPasswordStrength(data.password);

  const strengthText =
    strength <= 1
      ? "Weak password"
      : strength === 2
      ? "Fair password"
      : strength === 3
      ? "Good password"
      : "Strong password";

  const strengthColor =
    strength <= 1
      ? "bg-red-500"
      : strength === 2
      ? "bg-yellow-400"
      : strength === 3
      ? "bg-blue-500"
      : "bg-green-500";

  const passwordChecks = {
    length: data.password.length >= 8,
    uppercase: /[A-Z]/.test(data.password),
    number: /[0-9]/.test(data.password),
    special: /[^A-Za-z0-9]/.test(data.password),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#f4faf4] p-10">
          <img
            src={RegisterImage}
            alt="Expense Tracker Illustration"
            className="w-full max-w-sm object-contain"
          />

          <h2 className="mt-6 text-xl font-semibold text-gray-800 text-center">
            Manage Your Expenses
          </h2>

          <div className="mt-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm max-w-sm">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Track spending, manage budgets, and stay financially organized
              with ease.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM (CHANGED BACKGROUND COLOR) */}
        <div className="p-6 sm:p-10 flex flex-col justify-center bg-[#f9fdf9]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Already have an account?{" "}
              <a
                href="/"
                className="text-[#548f54] font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FIRST NAME */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full h-11 px-4 rounded-lg text-sm outline-none bg-white border
                ${
                  errors.username
                    ? "border-red-600 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#548f54]"
                }`}
              />

              {errors.username && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.username}
                </p>
              )}
            </div>

            {/* LAST NAME */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Last Name <span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full h-11 px-4 rounded-lg text-sm outline-none bg-white border
        ${
          errors.lastName
            ? "border-red-600 focus:ring-red-400"
            : "border-gray-300 focus:ring-[#548f54]"
        }`}
              />

              {errors.lastName && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-600">*</span>
              </label>

              <PhoneInput
                country={"in"}
                value={data.mobileNumber}
                onChange={(phone) =>
                  handleChange({
                    target: { name: "mobileNumber", value: phone },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                containerClass="w-full" // Container takes full width
                inputClass={`w-full h-12 px-4 rounded-lg text-sm outline-none bg-white border
      ${
        errors.mobileNumber
          ? "border-red-600 focus:ring-red-400"
          : "border-gray-300 focus:ring-[#548f54]"
      }`}
                buttonClass="bg-white border-r border-gray-300" // style for country flag button
              />

              {errors.mobileNumber && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.mobileNumber}
                </p>
              )}
            </div> */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-600">*</span>
              </label>

              <PhoneInput
                country={"in"}
                value={data.mobileNumber}
                onChange={handlePhoneChange}
                placeholder="Enter mobile number"
                inputStyle={{
                  width: "100%",
                  height: "44px",
                  paddingLeft: "3rem",
                  borderRadius: "0.5rem",
                  // fontSize: "14px",
                  background: "white",
                  border: errors.mobileNumber
                    ? "1px solid #dc2626"
                    : "1px solid #d1d5db",
                  color: "black",
                }}
                buttonStyle={{
                  background: "white",
                  border: errors.mobileNumber
                    ? "1px solid #dc2626"
                    : "1px solid #d1d5db",
                }}
              />

              {errors.mobileNumber && (
                <p className="text-[12px] text-red-600 leading-tight">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-600">*</span>
              </label>

              <input
                type="email"
                name="emailId"
                value={data.emailId}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full h-11 px-4 rounded-lg text-sm outline-none bg-white border
        ${
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

            {/* PASSWORD */}
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full h-11 px-4 pr-10 rounded-lg text-sm outline-none bg-white border
          ${
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

            {/* PASSWORD STRENGTH */}
            {data.password && (
              <div className="space-y-1">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthColor}`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>

                <p className="text-xs font-medium">{strengthText}</p>
              </div>
            )}
            {/* PASSWORD RULES */}
            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
              <p
                className={`flex items-center gap-1 ${
                  passwordChecks.length ? "text-green-600" : "text-gray-500"
                }`}
              >
                ✔ At least 8 characters
              </p>

              <p
                className={`flex items-center gap-1 ${
                  passwordChecks.uppercase ? "text-green-600" : "text-gray-500"
                }`}
              >
                ✔ One uppercase letter
              </p>

              <p
                className={`flex items-center gap-1 ${
                  passwordChecks.number ? "text-green-600" : "text-gray-500"
                }`}
              >
                ✔ One number
              </p>

              <p
                className={`flex items-center gap-1 ${
                  passwordChecks.special ? "text-green-600" : "text-gray-500"
                }`}
              >
                ✔ One special character
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full h-11 rounded-full text-white font-semibold transition-all
      ${
        isPending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#548f54] hover:bg-[#446f44]"
      }`}
            >
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
