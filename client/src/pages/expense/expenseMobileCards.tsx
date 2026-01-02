import { BiEdit } from "react-icons/bi";
import type { ExpenseData } from "./expenseTable";
import { MdDelete } from "react-icons/md";

interface ExpenseMobileCardsProps {
  isLoading: boolean;
  expenseData: ExpenseData[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseMobileCards({
  isLoading,
  expenseData,
  onEdit,
  onDelete,
}: ExpenseMobileCardsProps) {
  if (isLoading)
    return <p className="text-center py-6 text-gray-400">Loading...</p>;

  // if (expenseData.length === 0)
  //   return (
  //     <p className="text-center py-6 text-gray-400">No expense records found</p>
  //   );

  return (
    <div className="md:hidden pb-24">
      {expenseData.length === 0 ? (
        /* ===== NO DATA STATE ===== */
        <div className="flex items-center justify-center h-10">
          <p className="text-sm text-gray-400 italic">No data found</p>
        </div>
      ) : (
        /* ===== EXPENSE LIST ===== */
        <div className="space-y-5">
          {expenseData.map((item) => (
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
                {/* Category & Date */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-blue-400">
                    {item.expense_category || "Expense"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.expense_date).toLocaleDateString("en-IN")}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-2xl font-bold text-red-400">
                  ₹{item.expense_amount?.toLocaleString("en-IN") || 0}
                </div>

                {/* Payment Mode */}
                <div className="text-xs text-gray-400">
                  Payment:&nbsp;
                  <span className="text-gray-200 font-medium">
                    {item.payment_mode || "N/A"}
                  </span>
                </div>

                {/* Budget Category */}
                {item.budget_category && (
                  <div className="text-xs text-purple-300">
                    Budget:&nbsp;
                    <span className="font-semibold">
                      {item.budget_category}
                    </span>
                  </div>
                )}

                {/* Tags + Recurring */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags?.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}

                  {item.is_recurring && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full flex items-center gap-1">
                      🔄 Recurring
                    </span>
                  )}
                </div>
              </div>

              {/* ===== Actions Section ===== */}
              <div
                className="
              flex items-center justify-between
              px-4 py-3
              bg-[#26263a]
              border-t border-gray-700
            "
              >
                <span className="text-xs text-gray-400">Expense Record</span>

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
