import React, { useEffect, useState, useCallback, useMemo } from "react";
import { MdKeyboardArrowDown, MdCheckCircle } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX, FiAlertCircle } from "react-icons/fi";
import {
  useCreateIncome,
  useGetIncomeById,
  useUpdateIncome,
  type updateIncomePayload,
} from "../../api/income/income-hooks";
import { useFindAllGoal } from "../../api/goal/goal-hooks";
import type { GoalData } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface FormData {
  income_category: string;
  income_amount: string;
  income_date: string;
  payment_receive_mode: string;
  notes: string;
  saving_contribution: boolean;
  goal_id: string;
  goal_contribute_amount: string;
}

interface ValidationErrors {
  income_category?: string;
  income_amount?: string;
  income_date?: string;
  payment_receive_mode?: string;
  goal_id?: string;
  goal_contribute_amount?: string;
}

const INITIAL_FORM_STATE: FormData = {
  income_category: "",
  income_amount: "",
  income_date: "",
  payment_receive_mode: "",
  notes: "",
  saving_contribution: false,
  goal_id: "",
  goal_contribute_amount: "",
};

// Validation function
const validateForm = (
  data: FormData
  // choice: "yes" | "no" | null
): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.income_category?.trim()) {
    errors.income_category = "Category is required";
  }

  if (!data.income_amount?.trim()) {
    errors.income_amount = "Amount is required";
  } else if (Number(data.income_amount) <= 0) {
    errors.income_amount = "Amount must be greater than 0";
  } else if (Number(data.income_amount) > 10000000) {
    errors.income_amount = "Amount cannot exceed 1 crore";
  }

  if (!data.income_date?.trim()) {
    errors.income_date = "Date is required";
  } else {
    const selectedDate = new Date(data.income_date);
    const today = new Date();

    // normalize time
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      errors.income_date = "Date can't be in the future";
    }
  }

  if (!data.payment_receive_mode?.trim()) {
    errors.payment_receive_mode = "Payment mode is required";
  }

  // if (choice === "yes") {
  //   if (!data.goal_id?.trim()) {
  //     errors.goal_id = "Goal is required when contributing";
  //   }

  //   if (!data.goal_contribute_amount?.trim()) {
  //     errors.goal_contribute_amount = "Contribution amount is required";
  //   } else if (Number(data.goal_contribute_amount) <= 0) {
  //     errors.goal_contribute_amount = "Contribution must be greater than 0";
  //   } else if (
  //     Number(data.goal_contribute_amount) > Number(data.income_amount)
  //   ) {
  //     errors.goal_contribute_amount =
  //       "Cannot contribute more than income amount";
  //   }
  // }

  return errors;
};

const incomeCategories = [
  "Salary",
  "Business",
  "Freelancing",
  "Investments",
  "Rental Income",
  "Interest",
  "Bonus",
  "Commission",
  "Gifts",
  "Other",
];

const PAYMENT_MODES = [
  "Cash",
  "Google Pay",
  "PhonePe",
  "Paytm",
  "Bank Transfer",
  "Account Transaction",
  "Debit Card",
  "Credit Card",
  "Cheque",
  "Other",
];

export default function AddIncome({
  editingId,
  setEditingId,
}: {
  editingId: string | null;
  setEditingId?: (id: string | null) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(
    editingId
  );
  const [data, setData] = useState<FormData>(INITIAL_FORM_STATE);
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Determine if main required fields are filled and valid (independent of dialog)
  // const isMainFieldsValid = useMemo(() => {
  //   if (!data) return false;
  //   if (!data.income_category?.trim()) return false;
  //   if (!data.income_amount?.trim()) return false;

  //   const amountNum = Number(data.income_amount || 0);
  //   if (isNaN(amountNum) || amountNum <= 0) return false;

  //   if (!data.income_date?.trim()) return false;
  //   if (!data.payment_receive_mode?.trim()) return false;

  //   return true;
  // }, [data]);

  // Get income data by id
  const { data: incomeById } = useGetIncomeById(currentEditingId);

  // Get all goals
  const { data: GoalData } = useFindAllGoal();

  // Sync editingId prop with local state
  useEffect(() => {
    setCurrentEditingId(editingId);
  }, [editingId]);

  // Fetch and populate data by ID
  useEffect(() => {
    if (incomeById?.data) {
      const incomeData = incomeById.data;
      const goalId =
        typeof incomeData.goal_id === "string"
          ? incomeData.goal_id
          : incomeData.goal_id?._id ?? "";

      setData({
        income_amount: String(incomeData.income_amount || ""),
        income_category: incomeData.income_category || "",
        income_date: incomeData.income_date
          ? new Date(incomeData.income_date).toISOString().split("T")[0]
          : "",
        payment_receive_mode: incomeData.payment_receive_mode || "",
        notes: incomeData.notes || "",
        saving_contribution: incomeData.saving_contribution || false,
        goal_contribute_amount: String(incomeData.goal_contribute_amount || ""),
        goal_id: goalId,
      });

      setChoice(incomeData.saving_contribution ? "yes" : "no");
    }
  }, [incomeById?.data]);

  // Reset form
  const resetForm = useCallback(() => {
    setData(INITIAL_FORM_STATE);
    setCurrentEditingId(null);
    setChoice(null);
    setErrors({});
    setIsSubmitting(false);
    // keep parent in sync when form is reset
    if (setEditingId) setEditingId(null);
  }, [setEditingId]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    resetForm();
  }, [resetForm]);

  // API calls
  const { mutate: createIncome } = useCreateIncome(resetForm);
  const { mutate: updateIncome } = useUpdateIncome(resetForm);

  // Handle input changes
  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;
      setData((prev) => ({
        ...prev,
        [name]: name === "income_amount" ? value.replace(/[^0-9]/g, "") : value,
      }));
      // Clear error for this field when user starts typing
      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (overrides?: Partial<updateIncomePayload>) => {
      const goalId = overrides?.goal_id ?? data.goal_id;

      const submitData: FormData = {
        ...data,
        goal_id: goalId,
        goal_contribute_amount:
          overrides?.goal_contribute_amount?.toString() ??
          data.goal_contribute_amount,
      };
      const effectiveChoice: "yes" | "no" | null =
        typeof overrides?.saving_contribution !== "undefined"
          ? overrides?.saving_contribution
            ? "yes"
            : "no"
          : choice;

      const validationErrors = validateForm(submitData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      const isSaving =
        typeof overrides?.saving_contribution !== "undefined"
          ? overrides.saving_contribution
          : effectiveChoice === "yes";

      const payload: updateIncomePayload = {
        income_category: overrides?.income_category ?? data.income_category,
        income_amount:
          overrides?.income_amount ?? (Number(data.income_amount) || 0),
        notes: overrides?.notes ?? data.notes,
        payment_receive_mode:
          overrides?.payment_receive_mode ?? data.payment_receive_mode,
        income_date: overrides?.income_date ?? new Date(data.income_date),

        saving_contribution: isSaving,

        goal_id: isSaving ? goalId : null,
        goal_contribute_amount: isSaving
          ? Number(
              overrides?.goal_contribute_amount ?? data.goal_contribute_amount
            ) || 0
          : 0,

        id: currentEditingId || "",
      };

      if (currentEditingId) {
        updateIncome(payload, {
          onSettled: () => setIsSubmitting(false),
        });
      } else {
        createIncome(payload, {
          onSettled: () => setIsSubmitting(false),
        });
      }
    },
    [data, choice, currentEditingId, updateIncome, createIncome]
  );

  // Error message component
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
  const DialogGoalBody = () => {
    const [localChoice, setLocalChoice] = useState<"yes" | "no" | null>(choice);
    const [localGoalId, setLocalGoalId] = useState<string>(data.goal_id || "");
    const [localAmount, setLocalAmount] = useState<string>(
      data.goal_contribute_amount || ""
    );
    const [dialogErrors, setDialogErrors] = useState<ValidationErrors>({});

    const isDialogReady = useMemo(() => {
      if (!localChoice) return false;
      if (localChoice === "no") return true;
      // localChoice === 'yes'
      const amt = Number(localAmount || 0);
      const incomeAmt = Number(data.income_amount || 0);
      if (!localGoalId?.trim()) return false;
      if (!localAmount?.trim()) return false;
      if (isNaN(amt) || amt <= 0) return false;
      if (amt > incomeAmt) return false;
      return true;
    }, [localChoice, localGoalId, localAmount]);

    console.log("localChoice--", localChoice);

    useEffect(() => {
      if (openDialog) {
        setLocalChoice(choice);
        setLocalGoalId(data.goal_id || "");
        setLocalAmount(data.goal_contribute_amount || "");
        setDialogErrors({});
      }
    }, []);

    const handleSave = useCallback(() => {
      const dialogValidationData = {
        ...data,
        goal_id: localGoalId,
        goal_contribute_amount: localAmount,
        income_category: data.income_category,
        income_amount: data.income_amount,
        income_date: data.income_date,
        payment_receive_mode: data.payment_receive_mode,
        notes: data.notes,
        saving_contribution: localChoice === "yes",
      };

      const validationErrors = validateForm(dialogValidationData);

      if (Object.keys(validationErrors).length > 0) {
        setDialogErrors(validationErrors);
        return;
      }

      setChoice(localChoice);
      setData((prev) => ({
        ...prev,
        goal_id: localGoalId,
        goal_contribute_amount: localAmount,
        saving_contribution: localChoice === "yes",
      }));

      setOpenDialog(false);

      handleSubmit({
        goal_id: localGoalId,
        goal_contribute_amount: Number(localAmount) || 0,
        saving_contribution: localChoice === "yes",
      });
    }, [localChoice, localGoalId, localAmount]);

    const handleNoChange = () => {
      setLocalChoice("no"); // UI state
      setChoice("no");
      // Clear goal-related fields
      setLocalGoalId("");
      setLocalAmount("");

      setDialogErrors((prev) => ({
        ...prev,
        goal_id: undefined,
        goal_contribute_amount: undefined,
      }));
    };

    const handleAddGoal = () => {
      navigate("/goal");
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 rounded-lg p-3">
          <label className="text-sm font-medium text-blue-100">
            Do you want to contribute part of this income to your saving goal?
          </label>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer hover:text-green-400 transition">
            <input
              type="radio"
              name="saving"
              value="yes"
              checked={localChoice === "yes"}
              onChange={() => {
                setLocalChoice("yes");
                setChoice("yes");
                setDialogErrors({});
              }}
              className="cursor-pointer"
            />
            <span className="font-medium">Yes</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-red-400 transition">
            <input
              type="radio"
              name="saving"
              value="no"
              checked={localChoice === "no"}
              onChange={handleNoChange}
              className="cursor-pointer"
            />
            <span className="font-medium">No</span>
          </label>
        </div>

        {localChoice === "yes" && (
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium">
              Choose Goal <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <select
                className={`h-11 w-full px-4 pr-10 rounded-lg border transition-all text-sm
        focus:outline-none appearance-none
        ${
          dialogErrors.goal_id
            ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
            : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400"
        }`}
                value={localGoalId}
                onChange={(e) => {
                  setLocalGoalId(e.target.value);
                  if (dialogErrors.goal_id) {
                    setDialogErrors((prev) => ({
                      ...prev,
                      goal_id: undefined,
                    }));
                  }
                }}
                disabled={!GoalData?.data || GoalData.data.length === 0}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select a goal
                </option>

                {GoalData?.data?.map((item: GoalData) => (
                  <option
                    key={item._id}
                    value={item._id}
                    style={{ backgroundColor: "#2E2E48", color: "white" }}
                  >
                    {item.goal_name}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>

            {/* Empty State UI */}
            {GoalData?.data?.length === 0 && (
              <div className="mt-3 flex items-center justify-between bg-gray-900 bg-opacity-60 border border-dashed border-gray-600 rounded-lg p-3">
                <p className="text-sm text-gray-300">
                  No goals found.Create one to save!
                </p>
                <button
                  type="button"
                  onClick={handleAddGoal} // open modal or navigate
                  className="text-sm px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white transition"
                >
                  + Add Goal
                </button>
              </div>
            )}

            <ErrorMessage message={dialogErrors.goal_id} />
          </div>
        )}

        {localChoice === "yes" && localGoalId && (
          <div className="mt-4 flex flex-col">
            <label className="text-sm text-white mb-2 font-medium">
              Contribution Amount <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              value={localAmount}
              onChange={(e) => {
                setLocalAmount(e.target.value.replace(/[^0-9]/g, ""));
                if (dialogErrors.goal_contribute_amount) {
                  setDialogErrors((prev) => ({
                    ...prev,
                    goal_contribute_amount: undefined,
                  }));
                }
              }}
              placeholder="Enter amount"
              className={`h-11 w-full px-4 rounded-lg border transition-all text-sm
    focus:outline-none
    ${
      dialogErrors.goal_contribute_amount
        ? "border-red-500 bg-red-500 bg-opacity-10 text-red-200 focus:ring-2 focus:ring-red-500"
        : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400"
    }`}
            />

            <ErrorMessage message={dialogErrors.goal_contribute_amount} />
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={!isDialogReady || isSubmitting}
          className="bg-[#548f54] hover:bg-[#468f46] disabled:bg-gray-600 disabled:opacity-50 w-full h-11 rounded-lg text-white font-medium transition flex items-center justify-center gap-2"
          title={
            !isDialogReady
              ? "Please complete required dialog fields"
              : undefined
          }
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <MdCheckCircle size={18} />
              Save
            </>
          )}
        </button>
      </div>
    );
  };

  const validateBeforeDialogOpen = useCallback(() => {
    const validationErrors = validateForm(data);
    console.log({ validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setOpenDialog(true);
    return true;
  }, [data]);

  return (
    <div className="min-h-full">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-[#548f54] text-2xl font-bold">Income Details</h1>
        {currentEditingId && (
          <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            Editing Mode
          </span>
        )}
      </div>
      <div
        className="rounded-2xl p-6 shadow-lg w-full max-w-6xl mx-auto
  bg-[rgba(255,255,255,0.05)] border border-gray-700"
      >
        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Category <span className="text-red-600">*</span>
              {data.income_category && !errors.income_category && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative group">
              <select
                name="income_category"
                value={data.income_category}
                onChange={handleChange}
                className={`h-11 w-full min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                  ${
                    errors.income_category
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }`}
                style={{
                  backgroundColor: errors.income_category
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.15)",
                  color: errors.income_category ? "#fecaca" : "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Category
                </option>
                {incomeCategories.map((category) => (
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
                  errors.income_category ? "text-red-400" : "text-gray-300"
                }`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
            {errors.income_category ? (
              <ErrorMessage message={errors.income_category} />
            ) : data.income_category ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Income Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Amount <span className="text-red-600">*</span>
              {data.income_amount && !errors.income_amount && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative">
              <span className="absolute left-2 top-3 text-green-400 font-medium pointer-events-none">
                ₹
              </span>
              <input
                type="text"
                name="income_amount"
                value={data.income_amount}
                onChange={handleChange}
                className={`h-11 w-full min-w-0 px-6 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                  ${
                    errors.income_amount
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }
                  focus:outline-none`}
              />
            </div>
            {errors.income_amount ? (
              <ErrorMessage message={errors.income_amount} />
            ) : data.income_amount ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Date <span className="text-red-600">*</span>
              {data.income_date && !errors.income_date && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <input
              type="date"
              name="income_date"
              value={data.income_date}
              onChange={handleChange}
              className={`h-11 w-full min-w-0 px-4 pr-2 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                ${
                  errors.income_date
                    ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                    : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                }
                focus:outline-none`}
            />
            {errors.income_date ? (
              <ErrorMessage message={errors.income_date} />
            ) : data.income_date ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Payment Mode <span className="text-red-600">*</span>
              {data.payment_receive_mode && !errors.payment_receive_mode && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative group">
              <select
                name="payment_receive_mode"
                value={data.payment_receive_mode}
                onChange={handleChange}
                className={`h-11 w-full min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm  
                  ${
                    errors.payment_receive_mode
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }`}
                style={{
                  backgroundColor: errors.payment_receive_mode
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.15)",
                  color: errors.payment_receive_mode ? "#fecaca" : "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Mode
                </option>
                {PAYMENT_MODES.map((mode) => (
                  <option
                    key={mode}
                    value={mode}
                    style={{ backgroundColor: "#2E2E48", color: "white" }}
                  >
                    {mode}
                  </option>
                ))}
              </select>
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                  errors.income_category ? "text-red-400" : "text-gray-300"
                }`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
            {errors.payment_receive_mode ? (
              <ErrorMessage message={errors.payment_receive_mode} />
            ) : data.payment_receive_mode ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Notes */}
          <div className="flex flex-col lg:col-span-3 2xl:col-span-4">
            <label className="text-sm text-white mb-2 font-medium">
              Notes <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              placeholder="Add any notes here..."
              className="h-11 w-full lg:w-[600px] lg:h-20 min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-sm hover:border-green-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* <button
            onClick={() => {
              setOpenDialog(true);
              const isValid = validateBeforeDialogOpen();
              if (!isValid) return;

              setOpenDialog(true);
            }}
            disabled={!isMainFieldsValid || isSubmitting}
            title={
              !isMainFieldsValid
                ? "Fill required fields before proceeding"
                : undefined
            }
            className="bg-[#548f54] hover:bg-[#468f46] disabled:bg-gray-600 disabled:opacity-50 
              text-white font-medium py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          >
            {currentEditingId ? "Update Income" : "Add Income"}
          </button> */}
          <button
            onClick={() => {
              const canOpen = validateBeforeDialogOpen();
              if (!canOpen) return;
              setOpenDialog(false);
              setTimeout(() => setOpenDialog(true), 0);
            }}
            disabled={isSubmitting}
            className="bg-[#548f54] hover:bg-[#468f46] disabled:bg-gray-600 disabled:opacity-50 
    text-white font-medium py-2 px-6 rounded-lg shadow-md transition flex items-center gap-2"
          >
            {currentEditingId ? "Update Income" : "Add Income"}
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
                Goal Contribution Settings
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white transition">
                  <FiX size={22} />
                </button>
              </Dialog.Close>
            </div>

            <DialogGoalBody />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
