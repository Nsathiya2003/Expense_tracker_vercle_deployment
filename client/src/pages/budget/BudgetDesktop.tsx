import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import type { BudgetData } from "../../types/types";

interface BudgetTableDesktopProps {
  isLoading: boolean;
  budgetData: BudgetData[];
  onEdit: (id: string) => void;
  setDeleteId: (id: string) => void;
  setDeleteDialog: (open: boolean) => void;
}

export default function BudgetTableDesktop({
  isLoading,
  budgetData,
  onEdit,
  setDeleteId,
  setDeleteDialog,
}: BudgetTableDesktopProps) {
  if (isLoading) {
    return (
      <p className="text-center py-6 text-gray-400 hidden md:block">
        Loading...
      </p>
    );
  }

  return (
    <div
      className="
        hidden md:block
        bg-[rgba(255,255,255,0.05)]
        border border-gray-700
        shadow-lg
        backdrop-blur-md
        rounded-xl
        overflow-hidden
      "
    >
      <table className="w-full text-sm">
        {/* ================= TABLE HEAD ================= */}
        <thead className="bg-gradient-to-r from-[#2E2E48] to-[#3E3E5E] text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="py-4 px-4 text-left font-semibold">Category</th>
            <th className="py-4 px-4 text-left font-semibold">Budget Amount</th>
            <th className="py-4 px-4 text-left font-semibold">Start Date</th>
            <th className="py-4 px-4 text-left font-semibold">End Date</th>
            <th className="py-4 px-4 text-left font-semibold">Notification</th>
            <th className="py-4 px-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody>
          {budgetData.map((item, index) => (
            <tr
              key={item._id}
              className={`
                border-b border-gray-700
                hover:bg-[rgba(84,175,84,0.1)]
                transition
                ${
                  index % 2 === 0
                    ? "bg-[rgba(255,255,255,0.02)]"
                    : "bg-[rgba(255,255,255,0.05)]"
                }
              `}
            >
              {/* Category */}
              <td className="py-4 px-4 font-semibold text-white">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {item.budget_category || "N/A"}
                </span>
              </td>

              {/* Amount */}
              <td className="py-4 px-4 font-bold text-green-400">
                ₹{item.budget_amount?.toLocaleString("en-IN")}
              </td>

              {/* Start Date */}
              <td className="py-4 px-4 text-gray-300 text-sm">
                <span className="bg-gray-700/50 px-2 py-1 rounded">
                  {new Date(item.budget_start_date).toLocaleDateString(
                    "en-IN",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              </td>

              {/* End Date */}
              <td className="py-4 px-4 text-gray-300 text-sm">
                <span className="bg-gray-700/50 px-2 py-1 rounded">
                  {new Date(item.budget_end_date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </td>

              {/* Notification */}
              <td className="py-4 px-4 font-semibold">
                {!item.budget_exceeded ? (
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
                    Percentage – {item.reach_percentage}%
                  </span>
                ) : (
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs">
                    Exceeded
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="py-4 px-4 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                  title="Edit Budget"
                >
                  <BiEdit />
                </button>

                <button
                  onClick={() => {
                    setDeleteId(item._id);
                    setDeleteDialog(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  title="Delete Budget"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {budgetData.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-12 text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">📭</p>
                  <p>No budget records found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
