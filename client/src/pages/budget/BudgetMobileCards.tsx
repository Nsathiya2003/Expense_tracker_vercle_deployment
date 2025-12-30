import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { BudgetData } from "../../types/types";

interface Props {
  isLoading: boolean;
  budgetData: BudgetData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BudgetMobileCards({
  isLoading,
  budgetData,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className="md:hidden text-center text-gray-400 py-10">
        Loading budgets...
      </div>
    );
  }

  // if (!budgetData || budgetData.length === 0) {
  //   return (
  //     <div className="md:hidden text-center text-gray-400 py-10">
  //       No budget records found
  //     </div>
  //   );
  // }

  return (
    <div className="md:hidden pb-24">
      {budgetData.length === 0 ? (
        /* ===== NO DATA STATE ===== */
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-gray-400 italic">No budgets found</p>
        </div>
      ) : (
        /* ===== BUDGET LIST ===== */
        <div className="space-y-5">
          {budgetData.map((item) => (
            <div
              key={item._id}
              className="
            rounded-2xl
            bg-[#1f1f2e]
            border border-gray-700
            overflow-hidden
          "
            >
              {/* ===== Top Section ===== */}
              <div className="p-4 space-y-2">
                {/* Category & Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-400">
                    {item.budget_category || "Budget"}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      item.budget_exceeded
                        ? "bg-red-500/20 text-red-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {item.budget_exceeded ? "Exceeded" : "Active"}
                  </span>
                </div>

                {/* Budget Amount */}
                <div className="text-2xl font-bold text-green-400">
                  ₹{item.budget_amount?.toLocaleString("en-IN") || 0}
                </div>

                {/* Start Date */}
                <div className="text-xs text-gray-400">
                  Start Date:&nbsp;
                  <span className="text-gray-200 font-medium">
                    {new Date(item.budget_start_date).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {/* End Date */}
                <div className="text-xs text-gray-400">
                  End Date:&nbsp;
                  <span className="text-gray-200 font-medium">
                    {new Date(item.budget_end_date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                {/* Notification / Percentage */}
                <div className="text-xs text-blue-300">
                  Notification:&nbsp;
                  <span className="font-semibold text-yellow-400">
                    {item.budget_exceeded
                      ? "Exceeded"
                      : `Percentage - ${item.reach_percentage}`}
                  </span>
                </div>
              </div>

              {/* ===== Actions ===== */}
              <div
                className="
              flex items-center justify-between
              px-4 py-3
              bg-[#26263a]
              border-t border-gray-700
            "
              >
                <span className="text-xs text-gray-400">Budget Actions</span>

                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(item._id)}
                    className="
                  p-2 rounded-lg
                  bg-blue-500/20 text-blue-400
                  active:scale-95
                "
                  >
                    <BiEdit size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="
                  p-2 rounded-lg
                  bg-red-500/20 text-red-400
                  active:scale-95
                "
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
