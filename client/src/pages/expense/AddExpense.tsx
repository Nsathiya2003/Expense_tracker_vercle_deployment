import React, { useEffect, useState, useCallback, useMemo } from "react";
import { MdKeyboardArrowDown, MdCheckCircle } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX, FiAlertCircle } from "react-icons/fi";
import {
  useCheckBudgetLimit,
  useCreateExpense,
  useGetExpenseById,
  useUpdateExpense,
  type updateExpensePayload,
} from "../../api/expense/expense-hooks";

interface FormData {
  expense_category: string;
  expense_amount: string;
  expense_date: string;
  payment_mode: string;
  notes: string;
  budget_category: string;
  is_recurring: boolean;
  tags: string;
}

interface ValidationErrors {
  expense_category?: string;
  expense_amount?: string;
  expense_date?: string;
  payment_mode?: string;
}

const INITIAL_FORM_STATE: FormData = {
  expense_category: "",
  expense_amount: "",
  expense_date: "",
  payment_mode: "",
  notes: "",
  budget_category: "",
  is_recurring: false,
  tags: "",
};

const EXPENSE_CATEGORIES = [
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

const validateForm = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.expense_category?.trim()) {
    errors.expense_category = "Category is required";
  }

  if (!data.expense_amount?.trim()) {
    errors.expense_amount = "Amount is required";
  } else if (Number(data.expense_amount) <= 0) {
    errors.expense_amount = "Amount must be greater than 0";
  } else if (Number(data.expense_amount) > 10000000) {
    errors.expense_amount = "Amount cannot exceed 1 crore";
  }

  if (!data.expense_date?.trim()) {
    errors.expense_date = "Date is required";
  } else if (new Date(data.expense_date) > new Date()) {
    errors.expense_date = "Date cannot be in the future";
  }

  if (!data.payment_mode?.trim()) {
    errors.payment_mode = "Payment mode is required";
  }

  return errors;
};

export default function AddExpense({
  editingId,
}: {
  editingId: string | null;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(
    editingId
  );
  const [data, setData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);
  const [pendingPayload, setPendingPayload] =
    useState<updateExpensePayload | null>(null);
  const [budgetAlert, setBudgetAlert] = useState<{
    type: "percentage" | "exceeded";
    message: string;
    details: string;
    usedPercentage?: number;
    exceededBy?: number;
  } | null>(null);

  const isMainFieldsValid = useMemo(() => {
    if (!data) return false;
    if (!data.expense_category?.trim()) return false;
    if (!data.expense_amount?.trim()) return false;
    const amountNum = Number(data.expense_amount || 0);
    if (isNaN(amountNum) || amountNum <= 0) return false;
    if (!data.expense_date?.trim()) return false;
    if (new Date(data.expense_date) > new Date()) return false;
    if (!data.payment_mode?.trim()) return false;
    return true;
  }, [data]);

  const { data: expenseById } = useGetExpenseById(currentEditingId);

  useEffect(() => {
    setCurrentEditingId(editingId);
  }, [editingId]);

  useEffect(() => {
    if (expenseById?.data) {
      const expenseData = expenseById.data;
      setData({
        expense_amount: String(expenseData.expense_amount || ""),
        expense_category: expenseData.expense_category || "",
        expense_date: expenseData.expense_date
          ? new Date(expenseData.expense_date).toISOString().split("T")[0]
          : "",
        payment_mode: expenseData.payment_mode || "",
        notes: expenseData.notes || "",
        budget_category: expenseData.budget_category || "",
        is_recurring: expenseData.is_recurring || false,
        tags: expenseData.tags
          ? Array.isArray(expenseData.tags)
            ? expenseData.tags.join(", ")
            : expenseData.tags
          : "",
      });
    }
  }, [expenseById?.data]);

  const resetForm = useCallback(() => {
    setData(INITIAL_FORM_STATE);
    setCurrentEditingId(null);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const handleClearAll = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const { mutate: createExpense } = useCreateExpense(resetForm);
  const { mutate: updateExpense } = useUpdateExpense(resetForm);

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
        console.log("Name:", name, "Value:", value);
        setData((prev) => ({
          ...prev,
          [name]:
            name === "expense_amount" ? value.replace(/[^0-9]/g, "") : value,
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

  console.log("Recurring:", data.is_recurring);
  console.log("data----", data);

  const proceedExpenseSave = (payload: updateExpensePayload) => {
    if (currentEditingId) {
      updateExpense(payload, {
        onSettled: () => setIsSubmitting(false),
      });
    } else {
      createExpense(payload, {
        onSettled: () => setIsSubmitting(false),
      });
    }
  };

  const { mutate: checkBudgetLimit } = useCheckBudgetLimit();

  const handleSubmit = useCallback(
    (overrides?: Partial<updateExpensePayload>) => {
      const submitData: FormData = { ...data };
      const validationErrors = validateForm(submitData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);

      const payload: updateExpensePayload = {
        expense_category: overrides?.expense_category ?? data.expense_category,
        expense_amount:
          overrides?.expense_amount ?? (Number(data.expense_amount) || 0),
        notes: overrides?.notes ?? data.notes,
        payment_mode: overrides?.payment_mode ?? data.payment_mode,
        expense_date: overrides?.expense_date ?? new Date(data.expense_date),
        budget_category:
          (overrides?.budget_category ?? data.budget_category) || undefined,
        is_recurring: Boolean(data.is_recurring),
        tags:
          overrides?.tags ??
          (data.tags
            ? data.tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t)
            : undefined),
        id: currentEditingId || "",
      };

      checkBudgetLimit(
        {
          category: payload.expense_category,
          expense_amount: payload.expense_amount,
          expense_date: payload.expense_date,
        },
        {
          onSuccess: (res) => {
            if (res?.alert) {
              // store payload & show popup with alert details
              setPendingPayload(payload);
              setBudgetAlert({
                type: res.type,
                message: res.message || "Budget limit warning",
                details: res.details || "",
                usedPercentage: res.usedPercentage,
                exceededBy: res.exceededBy,
              });
              setShowBudgetWarning(true);
              setIsSubmitting(false);
              return;
            }

            // No alert → proceed directly
            proceedExpenseSave(payload);
          },
          onError: () => {
            setIsSubmitting(false);
          },
        }
      );
    },
    [data, currentEditingId]
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
    <div className="min-h-full lg:px-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-[#548f54] text-2xl font-bold">Expense Details</h1>
        {currentEditingId && (
          <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            Editing Mode
          </span>
        )}
      </div>

      <div
        className="rounded-2xl p-6 shadow-lg w-full max-w-7xl mx-auto
  bg-[rgba(255,255,255,0.05)] border border-gray-700"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-6">
          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Category <span className="text-red-600">*</span>
              {data.expense_category && !errors.expense_category && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative group">
              <select
                name="expense_category"
                value={data.expense_category}
                onChange={handleChange}
                className={`h-11 w-full min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                  ${
                    errors.expense_category
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }`}
                style={{
                  backgroundColor: errors.expense_category
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.15)",
                  color: errors.expense_category ? "#fecaca" : "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Category
                </option>
                {EXPENSE_CATEGORIES.map((category) => (
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
                  errors.expense_category ? "text-red-400" : "text-gray-300"
                }`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
            {errors.expense_category ? (
              <ErrorMessage message={errors.expense_category} />
            ) : data.expense_category ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Expense Amount */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Amount <span className="text-red-600">*</span>
              {data.expense_amount && !errors.expense_amount && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-red-400 font-medium pointer-events-none">
                ₹
              </span>
              <input
                type="text"
                name="expense_amount"
                value={data.expense_amount}
                onChange={handleChange}
                // placeholder="0"
                className={`h-11 w-full min-w-0 px-6 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                  ${
                    errors.expense_amount
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }
                  focus:outline-none`}
              />
            </div>
            {errors.expense_amount ? (
              <ErrorMessage message={errors.expense_amount} />
            ) : data.expense_amount ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Date <span className="text-red-600">*</span>
              {data.expense_date && !errors.expense_date && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <input
              type="date"
              name="expense_date"
              value={data.expense_date}
              onChange={handleChange}
              className={`h-11 w-full min-w-0 px-4 pr-2 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                ${
                  errors.expense_date
                    ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500"
                    : "border-gray-400 bg-[rgba(255,255,255,0.15)] focus:ring-2 focus:ring-green-400 hover:border-green-400"
                }
                focus:outline-none`}
            />
            {errors.expense_date ? (
              <ErrorMessage message={errors.expense_date} />
            ) : data.expense_date ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Payment Mode */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2">
              Payment Mode <span className="text-red-600">*</span>
              {data.payment_mode && !errors.payment_mode && (
                <span className="text-green-400 text-xs">(✓)</span>
              )}
            </label>
            <div className="relative group">
              <select
                name="payment_mode"
                value={data.payment_mode}
                onChange={handleChange}
                className={`h-11 w-full min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm
                  ${
                    errors.payment_mode
                      ? "border-red-500 bg-red-500 bg-opacity-10 focus:ring-2 focus:ring-red-500 text-red-200"
                      : "border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400"
                  }`}
                style={{
                  backgroundColor: errors.payment_mode
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(255,255,255,0.15)",
                  color: errors.payment_mode ? "#fecaca" : "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Mode
                </option>
                <option
                  value="Cash"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Cash
                </option>
                <option
                  value="Google Pay"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Google Pay
                </option>
                <option
                  value="Phone Pay"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Phone Pay
                </option>
                <option
                  value="Account"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Account
                </option>
                <option
                  value="Others"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Others
                </option>
              </select>
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                  errors.payment_mode ? "text-red-400" : "text-gray-300"
                }`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
            {errors.payment_mode ? (
              <ErrorMessage message={errors.payment_mode} />
            ) : data.payment_mode ? (
              <SuccessIndicator show={true} />
            ) : null}
          </div>

          {/* Notes */}
          <div className="flex flex-col lg:col-span-4">
            <label className="text-sm text-white mb-2 font-medium">
              Notes <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Add any notes here..."
              className="h-11 w-full lg:w-[600px] lg:h-20 min-w-0 px-4 pr-10 rounded-lg border transition-all text-sm
    appearance-none focus:outline-none shadow-sm rounded-lg border border-gray-400 
                bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-sm hover:border-green-400"
            />
          </div>

          {/* Budget Category */}
          <div className="flex flex-col">
            <label className="text-sm text-white mb-2 font-medium">
              Budget Category{" "}
              <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative group">
              <select
                name="budget_category"
                value={data.budget_category}
                onChange={handleChange}
                className={`h-11 w-full px-4 pr-10 rounded-lg border transition-all text-sm
                  appearance-none focus:outline-none shadow-sm
                  border-gray-400 bg-[rgba(255,255,255,0.15)] text-white focus:ring-2 focus:ring-green-400 hover:border-green-400`}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Select Budget Category
                </option>
                <option
                  value="Essential"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Essential
                </option>
                <option
                  value="Non-Essential"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Non-Essential
                </option>
                <option
                  value="Savings"
                  style={{ backgroundColor: "#2E2E48", color: "white" }}
                >
                  Savings
                </option>
              </select>
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors`}
              >
                <MdKeyboardArrowDown size={20} />
              </span>
            </div>
          </div>

          {/* Recurring Expense */}
          <div className="flex flex-col justify-center">
            <label className="text-sm text-white mb-2 font-medium flex items-center gap-2 h-5 cursor-pointer">
              <input
                type="checkbox"
                name="is_recurring"
                checked={data.is_recurring}
                onChange={handleChange}
                className="w-4 h-4 rounded-full border-gray-400 bg-[rgba(255,255,255,0.15)] cursor-pointer accent-green-400"
              />
              <span>Recurring Expense</span>
            </label>

            <p className="text-xs text-gray-400 ml-6">
              Enable this if the expense repeats regularly
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-col lg:col-span-2">
            <label className="text-sm text-white mb-2 font-medium">
              Tags{" "}
              <span className="text-gray-400 text-xs">
                (Optional, comma-separated)
              </span>
            </label>
            <input
              type="text"
              name="tags"
              value={data.tags}
              onChange={handleChange}
              placeholder="e.g., work, personal, urgent"
              className="h-11 w-full px-4 rounded-lg border border-gray-400 bg-[rgba(255,255,255,0.15)] text-white text-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-400 transition-all shadow-sm hover:border-green-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              {data.tags
                ? `${
                    data.tags.split(",").filter((t) => t.trim()).length
                  } tag(s)`
                : "No tags added"}
            </p>
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
            {currentEditingId ? "Update Expense" : "Add Expense"}
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
      {showBudgetWarning && budgetAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2E2E48] rounded-xl p-6 w-[420px] border border-gray-700">
            {/* Alert Card */}
            <div
              className={`rounded-lg p-4 mb-6 border-l-4 ${
                budgetAlert.type === "percentage"
                  ? "bg-yellow-500 bg-opacity-10 border-yellow-500"
                  : "bg-red-500 bg-opacity-10 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <FiAlertCircle
                  size={24}
                  className={`flex-shrink-0 mt-0.5 ${
                    budgetAlert.type === "percentage"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                />
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-sm mb-1 ${
                      budgetAlert.type === "percentage"
                        ? "text-yellow-300"
                        : "text-red-300"
                    }`}
                  >
                    {budgetAlert.message}
                  </h3>
                  <p className="text-xs text-gray-300">{budgetAlert.details}</p>

                  {/* Progress indicator for percentage */}
                  {budgetAlert.type === "percentage" &&
                    budgetAlert.usedPercentage !== undefined && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                budgetAlert.usedPercentage,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-yellow-300 mt-1 font-medium">
                          {budgetAlert.usedPercentage}% used
                        </p>
                      </div>
                    )}

                  {/* Exceeded amount for exceeded type */}
                  {budgetAlert.type === "exceeded" &&
                    budgetAlert.exceededBy !== undefined && (
                      <div className="mt-3 bg-red-600 bg-opacity-20 px-3 py-2 rounded border border-red-500 border-opacity-30">
                        <p className="text-xs text-red-200 font-semibold">
                          Exceeds by: ₹
                          {budgetAlert.exceededBy.toLocaleString("en-IN")}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition"
                onClick={() => {
                  setShowBudgetWarning(false);
                  setPendingPayload(null);
                  setBudgetAlert(null);
                }}
              >
                Cancel
              </button>

              <button
                className={`px-4 py-2 rounded-md text-white text-sm font-medium transition ${
                  budgetAlert.type === "percentage"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={() => {
                  if (pendingPayload) {
                    proceedExpenseSave(pendingPayload);
                  }
                  setShowBudgetWarning(false);
                  setPendingPayload(null);
                  setBudgetAlert(null);
                }}
              >
                {budgetAlert.type === "percentage"
                  ? "Continue Anyway"
                  : "Proceed Anyway"}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  {data.expense_category}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Amount:</span> ₹
                  {Number(data.expense_amount).toLocaleString("en-IN")}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Date:</span>{" "}
                  {new Date(data.expense_date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">Mode:</span>{" "}
                  {data.payment_mode}
                </p>
                {data.budget_category && (
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">
                      Budget Category:
                    </span>{" "}
                    {data.budget_category}
                  </p>
                )}
                {data.is_recurring && (
                  <p className="text-sm text-amber-300 flex items-center gap-2">
                    <span className="font-medium">⚠ Recurring Expense</span>
                  </p>
                )}
                {data.tags && (
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">Tags:</span>{" "}
                    {data.tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t)
                      .join(", ")}
                  </p>
                )}
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
