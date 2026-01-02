import { useState } from "react";
import { useSendForgotEmail } from "../api/users/user-hooks";
import LoginImage from "../assets/expense2.png";

export default function ForgotPassword() {
  const [data, setData] = useState({ emailId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isPending } = useSendForgotEmail();

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    mutate({ emailId: data.emailId });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#f4faf4] p-10">
          <img
            src={LoginImage}
            alt="Forgot Password"
            className="w-full max-w-sm object-contain"
          />
          <h2 className="mt-6 text-xl font-semibold text-gray-800 text-center">
            Forgot your password?
          </h2>
          <div className="mt-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm max-w-sm">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Enter your email to receive an OTP and reset your password.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-6 sm:p-10 flex flex-col justify-center bg-[#f9fdf9]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Forgot Password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="emailId"
                value={data.emailId}
                onChange={handleChange}
                placeholder="Enter your email"
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

            <button
              type="submit"
              disabled={isPending}
              className={`w-full h-11 rounded-full text-white font-semibold transition-all ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#548f54] hover:bg-[#446f44]"
              }`}
            >
              {isPending ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
