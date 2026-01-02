import { useState } from "react";
import type { LoginData } from "../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginUser } from "../api/users/user-hooks";
import LoginImage from "../assets/expense2.png";
// import { useAppContext } from "../context/AppContext";

export default function Login() {
  const [data, setData] = useState<LoginData>({
    emailId: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const { errorMsg } = useAppContext();

  const { mutate, isPending } = useLoginUser();

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

    if (!data.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({
      emailId: data.emailId,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#f4faf4] p-10">
          <img
            src={LoginImage}
            alt="Expense Tracker Login"
            className="w-full max-w-sm object-contain"
          />

          <h2 className="mt-6 text-xl font-semibold text-gray-800 text-center">
            Welcome Back
          </h2>

          {/* TEXT CARD */}
          <div className="mt-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm max-w-sm">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Log in to track your expenses, manage budgets, and stay in control
              of your finances.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 sm:p-10 flex flex-col justify-center bg-[#f9fdf9]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <p className="text-sm text-gray-500 mt-1">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-[#548f54] font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-[#548f54] font-medium hover:underline"
              >
                Forgot password?
              </a>
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
              {isPending ? "Logging in..." : "Login"}
            </button>
            {/* {errorMsg} */}
          </form>
        </div>
      </div>
    </div>
  );
}
