// import { useState } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";

// export default function AddBudget() {
//   const [notifyType, setNotifyType] = useState("percentage");
//   const [notifyPercent, setNotifyPercent] = useState(80);

//   return (
//     <div className="w-full">
//       <h1 className="text-[#548f54] text-2xl font-semibold mb-4 px-2">
//         Add Budget
//       </h1>

//       <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1200px] mx-auto bg-[rgba(255,255,255,0.05)]">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           {/* Category */}
//           {/* Category */}
//           <div className="flex flex-col w-[350px] mb-4 relative">
//             <label
//               htmlFor="category"
//               className="text-sm text-white mb-2 font-medium"
//             >
//               Choose Category <span className="text-red-600">*</span>
//             </label>

//             <div className="relative w-[260px]">
//               <select
//                 id="category"
//                 className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
//       bg-[rgba(255,255,255,0.15)] text-white text-sm
//       focus:outline-none focus:ring-2 focus:ring-green-400
//       transition-all duration-200 appearance-none"
//                 style={{
//                   backgroundColor: "rgba(255,255,255,0.15)",
//                   color: "white",
//                 }}
//               >
//                 <option value="" className="bg-[#2E2E48] text-white">
//                   Select Category
//                 </option>
//                 <option value="Food" className="bg-[#2E2E48] text-white">
//                   Food
//                 </option>
//                 <option value="Family" className="bg-[#2E2E48] text-white">
//                   Family
//                 </option>
//                 <option value="Education" className="bg-[#2E2E48] text-white">
//                   Education
//                 </option>
//                 <option value="Travel" className="bg-[#2E2E48] text-white">
//                   Travel
//                 </option>
//                 <option value="Others" className="bg-[#2E2E48] text-white">
//                   Others
//                 </option>
//               </select>

//               {/* Custom ▼ icon */}
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
//                 <MdKeyboardArrowDown size={20} />
//               </span>
//             </div>
//           </div>

//           {/* Month */}
//           <div className="flex flex-col w-[350px] mb-4 relative">
//             <label
//               htmlFor="month"
//               className="text-sm text-white mb-2 font-medium"
//             >
//               Choose Month <span className="text-red-600">*</span>
//             </label>

//             <div className="relative w-[260px]">
//               <select
//                 id="month"
//                 className="h-11 w-full px-4 pr-10 rounded-lg border border-gray-400
//       bg-[rgba(255,255,255,0.15)] text-white text-sm
//       focus:outline-none focus:ring-2 focus:ring-green-400
//       transition-all duration-200 appearance-none"
//                 style={{
//                   backgroundColor: "rgba(255,255,255,0.15)",
//                   color: "white",
//                 }}
//               >
//                 <option value="" className="bg-[#2E2E48] text-white">
//                   Select Month
//                 </option>
//                 {[
//                   "Jan",
//                   "Feb",
//                   "Mar",
//                   "Apr",
//                   "May",
//                   "Jun",
//                   "Jul",
//                   "Aug",
//                   "Sep",
//                   "Oct",
//                   "Nov",
//                   "Dec",
//                 ].map((m) => (
//                   <option key={m} value={m} className="bg-[#2E2E48] text-white">
//                     {m}
//                   </option>
//                 ))}
//               </select>

//               {/* Custom ▼ icon */}
//               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
//                 <MdKeyboardArrowDown size={20} />
//               </span>
//             </div>
//           </div>

//           {/* Budget Amount */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="budget_amount"
//               className="text-sm text-white mb-2 font-medium"
//             >
//               Budget Amount <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               id="budget_amount"
//               placeholder="Enter your amount"
//               className="h-11 px-4 rounded-lg border border-gray-400
//               bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-white
//               focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
//             />
//           </div>

//           {/* Start Date */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="budget_date"
//               className="text-sm text-white mb-2 font-medium"
//             >
//               Budget Start Date <span className="text-red-600">*</span>
//             </label>
//             <input
//               type="date"
//               id="budget_date"
//               className="h-11 px-4 rounded-lg border border-gray-400
//               bg-[rgba(255,255,255,0.15)] text-white text-sm
//               focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
//             />
//           </div>

//           {/* Notification Settings */}
//           <div className="flex flex-col lg:col-span-2">
//             <label className="text-sm text-white mb-2 font-medium">
//               When do you want to be notified?
//             </label>
//             <div className="flex flex-col gap-3 p-4 ">
//               {/* Option 1: Percentage */}
//               <label className="flex items-center gap-3 text-sm text-white">
//                 <input
//                   type="radio"
//                   name="notify"
//                   value="percentage"
//                   checked={notifyType === "percentage"}
//                   onChange={(e) => setNotifyType(e.target.value)}
//                   className="accent-[#548f54] hover:cursor-pointer"
//                 />
//                 <span>When spending reaches</span>
//                 <input
//                   type="text"
//                   min="1"
//                   max="100"
//                   value={notifyPercent}
//                   onChange={(e) => setNotifyPercent(Number(e.target.value))}
//                   className="w-16 px-2 py-1 rounded bg-[rgba(255,255,255,0.15)]
//   border-b border-gray-400 text-white text-sm text-center
//   focus:outline-none focus:border-green-400 transition-all duration-200"
//                 />
//                 <span>%</span>
//               </label>

//               {/* Option 2: Exceed */}
//               <label className="flex items-center gap-3 text-sm text-white">
//                 <input
//                   type="radio"
//                   name="notify"
//                   value="exceed"
//                   checked={notifyType === "exceed"}
//                   onChange={(e) => setNotifyType(e.target.value)}
//                   className="accent-[#548f54] hover:cursor-pointer"
//                 />
//                 <span>Only when I exceed the limit</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-start">
//           <button className="bg-[#548f54] hover:bg-[#437543] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-200">
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { MdKeyboardArrowDown, MdCheckCircle } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX, FiAlertCircle } from "react-icons/fi";
import type { updateBudgetPayload } from "../../api/budget/budgetApi";
import {
  useCreateBudget,
  useGetBudgetById,
  useUpdateBudget,
} from "../../api/budget/budget-hooks";

const BUDGET_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  // "Utilities",
  "Healthcare",
  "Education",
  "Shopping",
  "Personal Care",
  "Entertainment",
  "Travel",
  "Insurance",
  "EMI / Loan",
  "Gifts",
  // "Subscriptions",
  "Other",
];

interface FormData {
  budget_category: string;
  budget_amount: string;
  budget_month: string;
  budget_start_date: string;
  budget_end_date: string;

  notes: string;
  need_notification: boolean;
  budget_exceeded: boolean;
  budget_reaches: boolean;
  reach_percentage: string;
}

interface ValidationErrors {
  budget_category?: string;
  budget_amount?: string;
  budget_start_date?: string;
  payment_mode?: string;
  budget_month?: string;
  budget_end_date?: string;
}

const INITIAL_FORM_STATE: FormData = {
  budget_category: "",
  budget_amount: "",
  budget_month: "",
  budget_start_date: "",
  budget_end_date: "",
  notes: "",
  need_notification: true,
  budget_exceeded: true,
  budget_reaches: false,
  reach_percentage: "",
};

const validateForm = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.budget_category?.trim()) {
    errors.budget_category = "Category is required";
  }

  if (!data.budget_amount?.trim()) {
    errors.budget_amount = "Amount is required";
  } else if (Number(data.budget_amount) <= 0) {
    errors.budget_amount = "Amount must be greater than 0";
  } else if (Number(data.budget_amount) > 10000000) {
    errors.budget_amount = "Amount cannot exceed 1 crore";
  }

  if (!data.budget_start_date?.trim()) {
    errors.budget_start_date = "Date is required";
  }
  if (!data.budget_end_date?.trim()) {
    errors.budget_end_date = "Date is required";
  }

  return errors;
};

export default function AddBudget({
  editingId,
}: {
  editingId: string | null;
  setEditingId?: (id: string | null) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(
    editingId
  );
  const [data, setData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifyType, setNotifyType] = useState("exceed");
  const [notifyPercent, setNotifyPercent] = useState(80);

  console.log("notifyPercent---", notifyPercent);

  const isMainFieldsValid = useMemo(() => {
    if (!data) return false;
    if (!data.budget_category?.trim()) return false;
    if (!data.budget_amount?.trim()) return false;
    const amountNum = Number(data.budget_amount || 0);
    if (isNaN(amountNum) || amountNum <= 0) return false;
    if (!data.budget_start_date?.trim()) return false;
    if (new Date(data.budget_start_date) > new Date()) return false;
    if (!data.budget_end_date?.trim()) return false;
    // if (new Date(data.budget_end_date) > new Date()) return false;
    return true;
  }, [data]);

  const { data: budgetId } = useGetBudgetById(currentEditingId);

  useEffect(() => {
    setCurrentEditingId(editingId);
  }, [editingId]);

  useEffect(() => {
    if (budgetId?.data) {
      const budgetData = budgetId.data;
      setData({
        budget_amount: String(budgetData.budget_amount || ""),
        budget_category: budgetData.budget_category || "",
        budget_month: budgetData.budget_month || "",
        budget_start_date: budgetData.budget_start_date
          ? new Date(budgetData.budget_start_date).toISOString().split("T")[0]
          : "",
        budget_end_date: budgetData.budget_end_date
          ? new Date(budgetData.budget_end_date).toISOString().split("T")[0]
          : "",
        notes: budgetData.notes || "",
        need_notification: budgetData.need_notification || false,
        budget_exceeded: budgetData.budget_exceeded || false,
        budget_reaches: budgetData.budget_reaches || false,
        reach_percentage: budgetData.reach_percentage || "",
      });
      if (budgetId?.data) {
        const bd = budgetId.data;
        if (bd.budget_reaches === true) {
          setNotifyType("percentage");
          setNotifyPercent(Number(bd.reach_percentage || 80));
        } else {
          setNotifyType("exceed");
        }
      }
      // setNotifyPercent(
      //   budgetData.reach_percentage ? Number(budgetData.reach_percentage) : 80
      // );
    }
  }, [budgetId?.data]);

  const resetForm = useCallback(() => {
    setData(INITIAL_FORM_STATE);
    setCurrentEditingId(null);
    setErrors({});
    setIsSubmitting(false);
    setNotifyPercent(80);
    // reset to sensible default
    setNotifyType("exceed");
  }, []);

  const handleClearAll = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const { mutate: createBudget } = useCreateBudget(resetForm);
  const { mutate: updateBudget } = useUpdateBudget(resetForm);

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const target = event.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const { name, value } = target;
      const type = (target as HTMLInputElement).type;
      if (type === "checkbox") {
        setData((prev) => ({
          ...prev,
          [name]: (event.target as HTMLInputElement).checked,
        }));
      } else {
        setData((prev) => ({
          ...prev,
          [name]:
            name === "budget_amount" ? value.replace(/[^0-9]/g, "") : value,
        }));
      }
      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (overrides?: Partial<updateBudgetPayload>) => {
      const submitData: FormData = {
        ...data,
      };

      const validationErrors = validateForm(submitData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      console.log("Form data is valid. Proceeding to submit...", notifyType);

      setIsSubmitting(true);
      const payload: updateBudgetPayload = {
        budget_category: overrides?.budget_category ?? data.budget_category,
        budget_amount: overrides?.budget_amount ?? Number(data.budget_amount),
        notes: overrides?.notes ?? data.notes,
        budget_start_date:
          overrides?.budget_start_date ?? new Date(data.budget_start_date),
        budget_end_date:
          overrides?.budget_end_date ?? new Date(data.budget_end_date),

        need_notification: true,

        budget_reaches: Boolean(data.budget_reaches),
        budget_exceeded: !data.budget_reaches,
        reach_percentage: data.budget_reaches
          ? Number(data.reach_percentage || 80)
          : 0,

        id: currentEditingId || "",
      };

      console.log("Submitting payload:", payload);

      if (currentEditingId) {
        updateBudget(payload, {
          onSettled: () => setIsSubmitting(false),
        });
      } else {
        createBudget(payload, {
          onSettled: () => setIsSubmitting(false),
        });
      }
    },
    [data, currentEditingId, updateBudget, createBudget, notifyType]
  );

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
        <h1 className="text-[#548f54] text-2xl font-bold">Budget Details</h1>
        {currentEditingId && (
          <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            Editing Mode
          </span>
        )}
      </div>

      <div className="rounded-2xl p-6 shadow-lg w-full max-w-[1100px] mx-auto bg-[rgba(255,255,255,0.05)] border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Category <span className="text-red-600">*</span>
              {data.budget_category && !errors.budget_category && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative group">
              <select
                name="budget_category"
                value={data.budget_category}
                onChange={handleChange}
                className={`h-11 w-full px-6 pr-10 rounded-lg border transition-all text-sm
                  appearance-none focus:outline-none shadow-sm
                  ${
                    errors.budget_category
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }`}
                style={{
                  backgroundColor: errors.budget_category
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.15)",
                  color: errors.budget_category ? "#fecaca" : "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Category
                </option>
                {BUDGET_CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                    style={{ backgroundColor: "#2E2E48", color: "white" }}
                  >
                    {category}
                  </option>
                ))}
              </select>
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                  errors.budget_category ? "text-red-400" : "text-gray-300"
                }`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
            {errors.budget_category ? (
              <ErrorMessage message={errors.budget_category} />
            ) : data.budget_category ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Expense Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Budget Amount <span className="text-red-600">*</span>
              {data.budget_amount && !errors.budget_amount && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-red-400 font-medium pointer-events-none">
                ₹
              </span>
              <input
                type="text"
                name="budget_amount"
                value={data.budget_amount}
                onChange={handleChange}
                placeholder="0"
                className={`h-11 w-full px-6 pl-8 rounded-lg border transition-all text-white text-sm placeholder-gray-400 shadow-sm
                  ${
                    errors.budget_amount
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }
                  focus:outline-none`}
              />
            </div>
            {errors.budget_amount ? (
              <ErrorMessage message={errors.budget_amount} />
            ) : data.budget_amount ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Budget Start Date <span className="text-red-600">*</span>
              {data.budget_start_date && !errors.budget_start_date && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <input
              type="date"
              name="budget_start_date"
              value={data.budget_start_date}
              onChange={handleChange}
              className={`h-11 px-4 rounded-lg border transition-all text-white text-sm shadow-sm
                ${
                  errors.budget_start_date
                    ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                    : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                }
                focus:outline-none`}
            />
            {errors.budget_start_date ? (
              <ErrorMessage message={errors.budget_start_date} />
            ) : data.budget_start_date ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Budget End Date <span className="text-red-600">*</span>
              {data.budget_end_date && !errors.budget_end_date && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <input
              type="date"
              name="budget_end_date"
              value={data.budget_end_date}
              onChange={handleChange}
              className={`h-11 px-4 rounded-lg border transition-all text-white text-sm shadow-sm
                ${
                  errors.budget_end_date
                    ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                    : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                }
                focus:outline-none`}
            />
            {errors.budget_end_date ? (
              <ErrorMessage message={errors.budget_end_date} />
            ) : data.budget_end_date ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Notes */}
          <div className="flex flex-col lg:col-span-3">
            <label className="text-sm text-white mb-2 font-medium">
              Notes <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Add any notes here..."
              className="w-full px-4 py-2 rounded-lg border border-gray-400
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-sm hover:border-green-400"
            />
          </div>
          {/* Notification Settings */}
          <div className="flex flex-col lg:col-span-2">
            <label className="text-sm text-white mb-2 font-medium">
              When do you want to be notified?
            </label>
            <div className="flex flex-col gap-3 p-4 ">
              {/* Option 2: Exceed */}
              <label className="flex items-center gap-3 text-sm text-white">
                <input
                  type="radio"
                  checked={!data.budget_reaches}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      budget_reaches: false,
                      reach_percentage: "0",
                    }))
                  }
                />
                <span>Only when I exceed the limit</span>
              </label>

              <label className="flex items-center gap-3 text-sm text-white">
                <input
                  type="radio"
                  checked={data.budget_reaches}
                  onChange={() =>
                    setData((prev) => ({
                      ...prev,
                      budget_reaches: true,
                      reach_percentage: prev.reach_percentage || "80",
                    }))
                  }
                />

                <input
                  type="text"
                  inputMode="numeric"
                  value={data.reach_percentage}
                  disabled={!data.budget_reaches}
                  onChange={(e) => {
                    const v = Math.max(
                      1,
                      Math.min(100, Number(e.target.value) || 0)
                    );
                    setData((prev) => ({
                      ...prev,
                      reach_percentage: String(v),
                    }));
                  }}
                  className={`w-16 px-2 py-1 rounded text-center text-black ${
                    !data.budget_reaches ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                <span>%</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setOpenDialog(true)}
            disabled={!isMainFieldsValid || isSubmitting}
            title={
              !isMainFieldsValid
                ? "Fill required fields before proceeding"
                : undefined
            }
            className="bg-[#c17a6b] hover:bg-[#d48976] disabled:bg-gray-600 disabled:opacity-50
              text-white font-medium py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          >
            {currentEditingId ? "Update Budget" : "Add Budget"}
          </button>
          <button
            onClick={handleClearAll}
            disabled={isSubmitting}
            className="bg-[#5B3256] hover:bg-[#703a68] disabled:bg-gray-600 disabled:opacity-50
              text-white font-medium py-2 px-6 rounded-lg shadow-md transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Dialog */}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

          <Dialog.Content
            className="fixed top-1/2 left-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2
              bg-[#2E2E48] rounded-2xl shadow-2xl p-6 text-white
              data-[state=open]:animate-in data-[state=closed]:animate-out
              border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold">
                Confirm Expense
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white transition">
                  <FiX size={22} />
                </button>
              </Dialog.Close>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3">
                <p className="text-sm font-medium text-red-100">
                  Review your expense details before saving.
                </p>
              </div>

              <div className="space-y-2 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Category:</span>{" "}
                  {data.budget_category}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Amount:</span> ₹
                  {Number(data.budget_amount).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Date:</span>{" "}
                  {new Date(data.budget_start_date).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Date:</span>{" "}
                  {new Date(data.budget_end_date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpenDialog(false);
                  handleSubmit();
                }}
                disabled={isSubmitting}
                className="bg-[#c17a6b] hover:bg-[#d48976] disabled:bg-gray-600 disabled:opacity-50 w-full h-11 rounded-lg text-white font-medium transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <MdCheckCircle size={18} />
                    Confirm & Save
                  </>
                )}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
