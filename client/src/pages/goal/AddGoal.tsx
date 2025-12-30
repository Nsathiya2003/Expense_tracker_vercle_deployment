import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import type { UpdateGoalPayload } from "../../api/goal/goalApi";
import {
  useCreateGoal,
  useGetGoalById,
  useUpdateGoal,
} from "../../api/goal/goal-hooks";

interface ValidationErrors {
  goal_name?: string;
  target_amount?: string;
  deadline_date?: string;
}

export default function AddGoal({ editingId }: { editingId: string | null }) {
  const [data, setData] = useState({
    goal_name: "",
    target_amount: "",
    deadline_date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setData({
      goal_name: "",
      target_amount: "",
      deadline_date: "",
      notes: "",
    });
    setErrors({});
  };

  //for create goal...
  const { mutate } = useCreateGoal(resetForm);

  //update the goal...
  const { mutate: updateGoal } = useUpdateGoal(resetForm);

  //for get gaol by id...
  const { data: goalById } = useGetGoalById(editingId);

  useEffect(() => {
    if (goalById?.data) {
      setData({
        goal_name: goalById?.data?.goal_name,
        target_amount: String(goalById?.data?.target_amount),
        deadline_date: goalById.data.deadline_date
          ? new Date(goalById.data.deadline_date).toISOString().split("T")[0]
          : "",
        notes: goalById?.data?.notes,
      });
    }
  }, [goalById?.data]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!data.goal_name?.trim()) {
      newErrors.goal_name = "Goal name is required";
    }

    if (!data.target_amount?.trim()) {
      newErrors.target_amount = "Target amount is required";
    } else if (Number(data.target_amount) <= 0) {
      newErrors.target_amount = "Amount must be greater than 0";
    }

    if (!data.deadline_date?.trim()) {
      newErrors.deadline_date = "Deadline date is required";
    } else if (new Date(data.deadline_date) < new Date()) {
      newErrors.deadline_date = "Date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "target_amount" ? value.replace(/[^0-9]/g, "") : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload: UpdateGoalPayload = {
      goal_name: data?.goal_name,
      target_amount: Number(data?.target_amount),
      deadline_date: new Date(data?.deadline_date),
      notes: data?.notes,
      id: goalById?.data?._id,
    };
    if (goalById?.data?._id) {
      updateGoal(payload, {
        onSettled: () => setIsSubmitting(false),
      });
    } else {
      mutate(payload, {
        onSettled: () => setIsSubmitting(false),
      });
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-2 text-red-400 text-xs mt-2 animate-pulse">
        <FiAlertCircle size={14} className="flex-shrink-0 text-red-500" />
        <span className="font-medium">{message}</span>
      </div>
    );
  };

  const SuccessIndicator = ({ show }: { show?: boolean }) => {
    if (!show) return null;
    // return (
    //   <div className="flex items-center gap-2 text-green-400 text-xs mt-2 animate-pulse">
    //     <MdCheckCircle size={14} className="flex-shrink-0" />
    //     <span className="font-medium">Valid</span>
    //   </div>
    // );
  };

  return (
    <div className="min-h-full">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-[#548f54] text-2xl font-bold">
          {editingId ? "Edit Goal" : "Goal Details"}
        </h1>
        {editingId && (
          <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            Editing Mode
          </span>
        )}
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)] border border-gray-700">
          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Goal Name */}
            <div className="flex flex-col">
              <label
                htmlFor="goal_name"
                className="text-sm text-white mb-2 font-medium flex items-center gap-2"
              >
                Goal Name <span className="text-red-600">*</span>
                {data?.goal_name && !errors.goal_name && (
                  <span className="text-green-400 text-xs">(✓)</span>
                )}
              </label>
              <input
                type="text"
                id="goal_name"
                name="goal_name"
                value={data?.goal_name}
                onChange={handleChange}
                placeholder="e.g., Buy a Bike"
                className={`h-11 px-4 rounded-lg border transition-all text-white text-sm placeholder-gray-400 shadow-sm
                  ${
                    errors.goal_name
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }
                  focus:outline-none`}
              />
              {errors.goal_name ? (
                <ErrorMessage message={errors.goal_name} />
              ) : data?.goal_name ? (
                <SuccessIndicator show={true} />
              ) : null}
            </div>

            {/* Target Amount */}
            <div className="flex flex-col">
              <label
                htmlFor="target_amount"
                className="text-sm text-white mb-2 font-medium flex items-center gap-2"
              >
                Target Amount <span className="text-red-600">*</span>
                {data?.target_amount && !errors.target_amount && (
                  <span className="text-green-400 text-xs">(✓)</span>
                )}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-green-400 font-medium pointer-events-none">
                  ₹
                </span>
                <input
                  type="text"
                  id="target_amount"
                  name="target_amount"
                  value={data?.target_amount}
                  onChange={handleChange}
                  placeholder="0"
                  className={`h-11 w-full px-4 pl-8 rounded-lg border transition-all text-white text-sm placeholder-gray-400 shadow-sm
                    ${
                      errors.target_amount
                        ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                        : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                    }
                    focus:outline-none`}
                />
              </div>
              {errors.target_amount ? (
                <ErrorMessage message={errors.target_amount} />
              ) : data?.target_amount ? (
                <SuccessIndicator show={true} />
              ) : null}
            </div>

            {/* Target Date */}
            <div className="flex flex-col">
              <label
                htmlFor="deadline_date"
                className="text-sm text-white mb-2 font-medium flex items-center gap-2"
              >
                Target Date <span className="text-red-600">*</span>
                {data?.deadline_date && !errors.deadline_date && (
                  <span className="text-green-400 text-xs">(✓)</span>
                )}
              </label>
              <input
                type="date"
                id="deadline_date"
                name="deadline_date"
                value={data?.deadline_date}
                onChange={handleChange}
                className={`h-11 px-4 rounded-lg border transition-all text-white text-sm shadow-sm
                  ${
                    errors.deadline_date
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }
                  focus:outline-none`}
              />
              {errors.deadline_date ? (
                <ErrorMessage message={errors.deadline_date} />
              ) : data?.deadline_date ? (
                <SuccessIndicator show={true} />
              ) : null}
            </div>

            {/* Notes */}
            <div className="flex flex-col">
              <label
                htmlFor="notes"
                className="text-sm text-white mb-2 font-medium"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={data?.notes}
                onChange={handleChange}
                placeholder="Add notes about your goal..."
                rows={1}
                className="h-11 px-4 rounded-lg border border-gray-400 bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-400 transition-all shadow-sm resize-none"
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 
              px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#548f54] hover:bg-[#468f46] disabled:bg-gray-600 disabled:opacity-50 text-white font-medium py-2.5 
              px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <MdCheckCircle size={18} />
                  {editingId ? "Update Goal" : "Save Goal"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
